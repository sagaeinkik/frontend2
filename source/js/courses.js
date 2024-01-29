'use strict';

//Variabler
const tableBody = document.querySelector('tbody'); //Där ska vi peta in elementen
const courseCodeHeading = document.getElementById('coursecode'); //Th-element med kurskod-rubrik
const courseNameHeading = document.getElementById('coursename'); //Th-element med kursnamn-rubrik
const courseProgressionHeading = document.getElementById('progression'); //Th-element med progression-rubrik
const searchBar = document.querySelector('input[type="search"]'); //Sökrutan
let latestSort = null; //En slags toggle för att byta håll på sorteringen

//Hämta datan så fort sidan är laddad
window.onload = getCourses;

/* HÄMTA DATAN FRÅN API  */

//Funktion för att hämta datan
async function getCourses() {
    try {
        //Hämta kurserna
        const response = await fetch(
            'https://dahlgren.miun.se/ramschema_ht23.php'
        );
        //Lagra arrayen i variabel
        const courseData = await response.json();
        //Skicka arrayen till nästa funktion som skriver ut på skärmen
        displayCourses(courseData);
        //Lägg event listeners på rubrikerna och kalla på funktion som sorterar
        courseCodeHeading.addEventListener('click', () => {
            sortArray(courseData, 'code');
        });
        courseNameHeading.addEventListener('click', () => {
            sortArray(courseData, 'coursename');
        });
        courseProgressionHeading.addEventListener('click', () => {
            sortArray(courseData, 'progression');
        });
        //on input för att jag bryr mig inte om man trycker t ex ctrl + a, jag vill bara veta om värdet ändras
        searchBar.addEventListener('input', () => {
            searchFunction(courseData);
        });
    } catch (error) {
        console.error(error);
    }
}

//Funktion för att skriva ut kurserna till DOM som de är
function displayCourses(courseArray) {
    //Rensa gammalt
    tableBody.innerHTML = '';
    //Loopa igenom varje kurs i arrayen
    courseArray.forEach((course) => {
        //gör om course code till stora bokstäver pga snyggare så
        let courseCode = course.code;
        courseCode = courseCode.toUpperCase();
        //Skapa ny table row med tre table data för varje kurs
        const courseRow = `
        <tr>
        <td class="c-code">${courseCode}</td>
        <td class="c-name">${course.coursename}</td>
        <td class="c-progress">${course.progression}</td>
        </tr>`;
        //Peta in i DOM
        tableBody.innerHTML += courseRow;
    });
}

/* SÖKFUNKTION */
function searchFunction(courseArray) {
    //Ta värdet i searchbar och gör stora bokstäver så det går att jämföra
    const searchString = searchBar.value.toUpperCase();
    //Ny array med de filtrerade värdena: om code eller coursename innehåller tecken från searchstring så returneras de
    const searchResult = courseArray.filter((course) => {
        return (
            course.code.toUpperCase().includes(searchString) ||
            course.coursename.toUpperCase().includes(searchString)
        );
    });
    //Skicka med nya arrayen till display courses
    displayCourses(searchResult);
}

function sortArray(courseArray, sortByX) {
    //Tom variabel att peta in den sorterade arrayen i
    let sortedCourses;

    //Sortera kurser baserat på argument som skickades med i anropet
    sortedCourses = courseArray.sort((a, b) =>
        a[sortByX].localeCompare(b[sortByX])
    );

    //Om sorteringsalternativ redan är klickad på en gång, så vänds ordningen
    if (sortByX === latestSort) {
        sortedCourses.reverse();
        //variabeln nollställs
        latestSort = null;
    } else {
        //tilldela variabeln vad man sorterade på sist
        latestSort = sortByX;
    }
    //anropa funktionen, skicka med sorterade arrayen som argument
    displayCourses(sortedCourses);
}
