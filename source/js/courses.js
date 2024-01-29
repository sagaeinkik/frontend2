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
    } else {
        codeSortedCourses = courseArray
            .sort((a, b) => (a.code > b.code ? 1 : -1))
            .reverse();
        /* Ändra variabeln */
        codeSortOrder = 'stigande';
    }
    //Skicka med till displayCourses
    displayCourses(codeSortedCourses);
}

/* SORTERA ENLIGT NAMN */
let nameSortOrder = 'stigande';

function sortOnName(courseArray) {
    let nameSortedCourses;

    if (nameSortOrder === 'stigande') {
        nameSortedCourses = courseArray.sort((a, b) =>
            a.coursename.localeCompare(b.coursename)
        );
        nameSortOrder = 'fallande';
    } else {
        nameSortedCourses = courseArray.sort((a, b) =>
            b.coursename.localeCompare(a.coursename)
        );
        nameSortOrder = 'stigande';
    }
    displayCourses(nameSortedCourses);
}

/* SORTERA ENLIGT PROGRESSION */
let progressionSortOrder = 'stigande';
function sortOnProgression(courseArray) {
    let progressSortedCourses;
    if (progressionSortOrder === 'stigande') {
        progressSortedCourses = courseArray.sort((a, b) =>
            a.progression.localeCompare(b.progression)
        );
        progressionSortOrder = 'fallande';
    } else {
        progressSortedCourses = courseArray.sort((a, b) =>
            b.progression.localeCompare(a.progression)
        );
        progressionSortOrder = 'stigande';
    }
    displayCourses(progressSortedCourses);
}

/* ICKEFUNGERANDE KOD */

/* function sortOnName(courseArray) {
    sortArray(courseArray, 'coursename', nameSortOrder);
} */

/* den här koden funkade inte när det gällde att byta riktning på sortering. Den bytte variabeln till fallande men aldrig tillbaka till stigande.
Den får vara kvar bara för att visa att jag försökte minifiera koden och göra den mer återanvändbar.  */
/* 
function sortArray(courseArray, sortByX, sortOrder) {
    //Kolla sortOrder från start
    console.log(sortOrder);

    //Tom variabel att peta in den sorterade arrayen i
    let sortedCourses;

    //om sorteringsvariabeln har värde stigande så sorteras den a, b, c
    if (sortOrder === 'stigande') {
        sortedCourses = courseArray.sort((a, b) =>
            a[sortByX] > b[sortByX] ? 1 : -1
        );
        //Ändra variabeln till fallande
        sortOrder = 'fallande';
        //kolla om det funkade
        console.log(sortOrder);

        //anropa funktionen och skicka med sorterade arrayen
        displayCourses(sortedCourses);

        //Annars har sorteringsvariabeln värde fallande och sorteras c, b, a
    } else {
        sortedCourses = courseArray
            .sort((a, b) => (a[sortByX] > b[sortByX] ? 1 : -1))
            .reverse();
        //Ändra variabeln
        sortOrder = 'stigande';
        //Kolla om det funkade
        console.log(sortOrder);
        //Anropa funktionen och skicka med sorterade arrayen
        displayCourses(sortedCourses);
    }
} */
