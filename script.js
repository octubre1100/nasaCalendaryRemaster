const hoy = new Date().toISOString().split("T")[0];
const fecha = document.getElementById("fecha");
fecha.setAttribute("max", hoy);

const ttle = document.getElementById("title");
const img = document.getElementById("imgNa");
const explain = document.getElementById("explain");
const suertebt = document.getElementById("suertebt")
async function mostrar() {
    const fechaSeleccionada = fecha.value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=HgVo8m2PE2wuajnKjgLSeNJU6MTQypeRCLJFNMMB&date=${fechaSeleccionada}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const datos = await res.json();
        console.log(datos);
        ttle.textContent = datos.title;
        explain.textContent = datos.explanation;
        img.src = datos.url;

    } catch (error) {
        console.error("Error al obtener datos de la NASA:", error);
        ttle.textContent = "Error al cargar datos";
        explain.textContent = "";
        img.removeAttribute("src");
    }
}

fecha.addEventListener("change", mostrar);
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

suertebt.onclick = function suerte() {
    let today = new Date();
    let randomDate;
    let year, month, day;

    do {
        year = getRandomIntInclusive(1995, 2025);
        month = getRandomIntInclusive(1, 12);

        if (year == 1995) {
            month = getRandomIntInclusive(6, 12);
        }

        if (month == 2) {
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                day = getRandomIntInclusive(1, 29);
            } else {
                day = getRandomIntInclusive(1, 28);
            }
        } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
            day = getRandomIntInclusive(1, 31);
        } else {
            day = getRandomIntInclusive(1, 30);
        }

        randomDate = new Date(year, month - 1, day);
    } while (randomDate > today);

   
}