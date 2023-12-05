//ELEMNTOS DEL DOM DE LA PRIMER PANTALLA DE INGRESO

const seccionInicio = document.querySelector("#seccionInicio");

//CLASE MOLDE PARA EJERCICIOS
class Videos {
  constructor(id, titulo, categoria, descripcion, video) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.video = video;
  }
}

//CLASE QUE SIMULA BASE DE DATO, TOMANDO DATOS DEL JSON
class BaseDeDatos {
  constructor() {
    this.videosBD = [];
    this.videosBDos = [];

    this.cargarRegistros();
    this.cargarRegistrosDos();
  }
  async cargarRegistros() {
    try {
      const resultado = await fetch(`json/videos.json`);

      if (!resultado.ok) {
        throw new Error(
          `Error al cargar registros. Código ${resultado.status}`
        );
      }

      this.videosBD = await resultado.json();
    } catch (error) {
      console.error("Error al cargar registros:", error.message);
    }
  }
  async cargarRegistrosDos() {
    try {
      const resultado = await fetch(`json/videosProgramas.json`);

      if (!resultado.ok) {
        throw new Error(
          `Error al cargar registros. Código ${resultado.status}`
        );
      }

      this.videosBDos = await resultado.json();
    } catch (error) {
      console.error("Error al cargar registros:", error.message);
    }
  }
}

const bd = new BaseDeDatos();

//ELEMENTOS DEL DOM

const inputBuscar = document.querySelector("#inputBuscador");
const divResultados = document.querySelector("#resultados");
const body = document.querySelector("#body");
const lex100 = document.querySelector("#lex100");
const programas = document.querySelector("#programas");
const programasResultados = document.querySelector("#resultadosProgramas");

programas.addEventListener("click", function () {
  divResultados.classList.replace("resultados", "ocultar");
  programasResultados.classList.replace("ocultar", "resultados");
});

lex100.addEventListener("click", function () {
  programasResultados.classList.replace("resultados", "ocultar");
  divResultados.classList.replace("ocultar", "resultados");
});

// Función para mostrar todos los videos
function mostrarTodosLosVideos() {
  divResultados.innerHTML = "";
  bd.videosBD.map((video) => {
    divResultados.innerHTML += `<div class="videosBusqueda">
    <h3>${video.titulo}</h3>
    <p class="descripcion">${video.descripcion}</p>
    <a href=${video.video} class="videoElemento" target="_blank">
      <img class="imagenVideo" src=${video.image} alt="Captura imagen video miniatura">
    </a>
  </div>`;
  });
}
function mostrarTodosLosVideosDos() {
  programasResultados.innerHTML = "";
  bd.videosBDos.map((video) => {
    programasResultados.innerHTML += `<div class="videosBusqueda">
    <h3>${video.titulo}</h3>
    <p class="descripcion">${video.descripcion}</p>
    <a href=${video.video} class="videoElemento" target="_blank">
      <img class="imagenVideo" src=${video.image} alt="Captura imagen video miniatura">
    </a>
  </div>`;
  });
}

// Función principal que se ejecuta al cargar la página
async function main() {
  await bd.cargarRegistros();
  mostrarTodosLosVideos();
  mostrarTodosLosVideosDos();

  // Evento input para detectar la entrada del usuario
  inputBuscar.addEventListener("input", function () {
    const textoBuscado = inputBuscar.value.trim().toUpperCase();
    divResultados.innerHTML = ""; // Limpia el contenido anterior de resultados
    programasResultados.innerHTML = "";
    if (textoBuscado === "") {
      mostrarTodosLosVideos();
      mostrarTodosLosVideosDos();
      return;
    }

    // Filtra videos que coincidan con el texto buscado
    const coincidencias = bd.videosBD.filter((v) =>
      v.titulo.toUpperCase().includes(textoBuscado)
    );
    const coincidenciasDos = bd.videosBDos.filter((v) =>
      v.titulo.toUpperCase().includes(textoBuscado)
    );

    // Muestra la lista de coincidencias
    if (coincidencias.length > 0 || coincidenciasDos.length > 0) {
      coincidencias.map((video) => {
        divResultados.innerHTML += `<div class="videosCoincidencia">
          <h3>${video.titulo}</h3>
          <p class="descripcion">${video.descripcion}</p>
          <a href=${video.video} class="videoElemento" target="_blank">
            <img class="imagenVideo" src=${video.image} alt="Captura imagen video miniatura">
          </a>
        </div>`;
      });
      coincidenciasDos.map((video) => {
        programasResultados.innerHTML += `<div class="videosCoincidencia">
          <h3>${video.titulo}</h3>
          <p class="descripcion">${video.descripcion}</p>
          <a href=${video.video} class="videoElemento" target="_blank">
            <img class="imagenVideo" src=${video.image} alt="Captura imagen video miniatura">
          </a>
        </div>`;
      });
    } else {
      divResultados.innerHTML = `<p>NO SE ENCONTRARON RESULTADOS</p>`;
      programasResultados.innerHTML = `<p>NO SE ENCONTRARON RESULTADOS</p>`;
    }
  });
}

// Llama a la función main al cargar la página
main();
