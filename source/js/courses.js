'use strict';

//Variabler
const tableBody = document.querySelector('tbody'); //Där ska vi peta in elementen

//Funktion för att hämta datan
async function getCourses() {
    try {
        const response = await fetch(
            'https://dahlgren.miun.se/ramschema_ht23.php'
        );
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function printData() {
    //lagra arrayen i en variabel
    const data = await getCourses();
    //Loopa igenom varje
    data.forEach((course) => {
        //Skapa nytt element för varje objekt i arrayen
        const courseRow = `<tr>
        <td class="c-code">${course.code}</td>
        <td class="c-name">${course.coursename}</td>
        <td class="c-progress">${course.progression}</td>
        </tr>`;
        tableBody.innerHTML += courseRow;
    });
}

printData();
