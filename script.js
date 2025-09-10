const fp = flatpickr("#fecha", {
  dateFormat: "Y-m-d",
  minDate: "1995-06-01",
  maxDate: new Date(),
  defaultDate: new Date(),
  allowInput: true,
  altInput: true,
  altFormat: "F j, Y",
  animate: true,
});
const ttle = document.getElementById("title");
const imgNasa = document.getElementById("imgNasa");
const explain = document.getElementById("explain");
const suerteBt = document.getElementById("suerteBt");
const loader = document.getElementById("loader");
const fecha = document.getElementById("fecha");
async function mostrar() {
  const fechaSeleccionada = fp.input.value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=HgVo8m2PE2wuajnKjgLSeNJU6MTQypeRCLJFNMMB&date=${fechaSeleccionada}`;
  try {
    loader.style.display = "block";
    imgNasa.style.display = "none";

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const datos = await res.json();
    console.log(datos);

    ttle.textContent = datos.title || "Sin título";
    explain.textContent = datos.explanation || "Sin explicación";

    if (datos.media_type === "image") {
      const image = new Image();
      image.src = datos.url;
      image.onload = () => {
        imgNasa.src = datos.url;
        imgNasa.style.display = "block";
        loader.style.display = "none";
      };
    } else {
      loader.style.display = "none";
      imgNasa.removeAttribute("src");
      imgNasa.style.display = "none";
    }
  } catch (error) {
    console.error("Error al obtener datos de la NASA:", error);
    ttle.textContent = "Error al cargar datos";
    explain.textContent = "";
    imgNasa.removeAttribute("src");
    loader.style.display = "none";
  }
}

fecha.addEventListener("change", mostrar);

function RNG(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

suerteBt.onclick = async function suerte() {
  let today = new Date();
  let randomDate;
  let year, month, day;

  do {
    year = RNG(1995, 2025);
    month = RNG(1, 12);
    if (year == 1995) month = RNG(6, 12);

    if (month == 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        day = RNG(1, 29);
      } else {
        day = RNG(1, 28);
      }
    } else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      day = RNG(1, 31);
    } else {
      day = RNG(1, 30);
    }

    randomDate = new Date(year, month - 1, day);
  } while (randomDate > today);

  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  fp.setDate(dateStr, true);
  const url = `https://api.nasa.gov/planetary/apod?api_key=HgVo8m2PE2wuajnKjgLSeNJU6MTQypeRCLJFNMMB&date=${dateStr}`;

  try {
    loader.style.display = "block";
    imgNasa.style.display = "none";

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const datos = await res.json();
    console.log(datos);

    ttle.textContent = datos.title || "Sin título";
    explain.textContent = datos.explanation || "Sin explicación";

    if (datos.media_type === "image") {
      const image = new Image();
      image.src = datos.url;
      image.onload = () => {
        imgNasa.src = datos.url;
        imgNasa.style.display = "block";
        loader.style.display = "none";
      };
    } else {
      loader.style.display = "none";
      imgNasa.removeAttribute("src");
      imgNasa.style.display = "none";
    }
  } catch (error) {
    console.error("Error al obtener datos de la NASA:", error);
    ttle.textContent = "Error al cargar datos";
    explain.textContent = "";
    imgNasa.removeAttribute("src");
    loader.style.display = "none";
  }
};
