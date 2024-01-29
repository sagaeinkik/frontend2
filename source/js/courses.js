'use strict';

//Variabler
const tableBody = document.querySelector('tbody'); //Där ska vi peta in elementen
const tableHead = document.querySelector('thead');
const courseCodeHeading = document.getElementById('coursecode'); //Th-element med kurskod-rubrik
const courseNameHeading = document.getElementById('coursename'); //Th-element med kursnamn-rubrik
const courseProgressionHeading = document.getElementById('progression'); //Th-element med progression-rubrik

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
        //Lägg event listeners på rubrikerna och kalla olika funktioner för sortering
        courseCodeHeading.addEventListener('click', () => {
            sortOnCode(courseData);
        });
        courseNameHeading.addEventListener('click', () => {
            sortOnName(courseData);
        });
        courseProgressionHeading.addEventListener('click', () => {
            sortOnProgression(courseData);
        });
    } catch (error) {
        console.error(error);
    }
}

//Funktion för att skriva ut kurserna till DOM som de är
function displayCourses(courseArray) {
    tableBody.innerHTML = '';
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

/* SORTERA I KURSKODSORDNING */

//En toggle för att byta håll i sorteringen. Må va utanför funktionen, annars nollställs den och sorteringen funkar inte efter första klick
let codeSortOrder = 'stigande';

//Funktion för att sortera kurserna
function sortOnCode(courseArray) {
    /* Tom variabel som används för att lagra arrayen efter den är sorterad  */
    let codeSortedCourses;

    /* Kontroll som sorterar utifrån toggle-variabeln  */
    if (codeSortOrder === 'stigande') {
        codeSortedCourses = courseArray.sort((a, b) =>
            a.code > b.code ? 1 : -1
        );
        /* Ändra variabeln */
        codeSortOrder = 'fallande';
    } else if (codeSortOrder === 'fallande') {
        codeSortedCourses = courseArray
            .sort((a, b) => (a.code > b.code ? 1 : -1))
            .reverse();
        /* Ändra variabeln */
        codeSortOrder = 'stigande';
    }
    //Skicka med till displayCourses
    displayCourses(codeSortedCourses);
}
