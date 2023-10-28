let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {
 base_preguntas = readText("base-preguntas.json");
 interprete_bp = JSON.parse(base_preguntas);
 escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
 select_id("btn1"),
 select_id("btn2"),
 select_id("btn3"),
 select_id("btn4")
];

let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
 let n;
 if (preguntas_aleatorias) {
   n = 0;
 }

 while (npreguntas.includes(n)) {
   n++;
   if (n >= interprete_bp.length) {
     n = 0;
   }
   if (npreguntas.length == interprete_bp.length) {

     //Aquí es donde el juego se reinicia
     if (mostrar_pantalla_juego_términado) {
       swal.fire({
         title: "¡Uyyyy felicidades mi súper esposo!",
         text:
           "Lograste terminar el juego uyyyy, espero te haya gustado este lindo quiz mi amor, tu linda puntuación es de: " + preguntas_correctas + "/" + (preguntas_hechas - 0),
         imageUrl: 'https://media.tenor.com/Dix08_jLga0AAAAi/celebrate-mocha.gif',
         imageWidth: '250px',
         imageAlt: 'felicidades',
         background: 'black',
         confirmButtonText: 'Reclamar premio♡',
         confirmButtonColor: 'Violet',
         allowOutsideClick: false,
         allEscapeKey: false,
         allEnterKey: false,
         stopKeydownPropagation: false,
         customClass: {
           title: 'titulo',
           text: 'texto01'
         },
         preConfirm: function() {
          window.location.href = "https://mr-y-mrs-debail.github.io/Tu_lindo_premio/";
        }
       });

        // Guardar la puntuación del jugador
        localStorage.setItem('puntuacion', preguntas_correctas);
     }
     if (reiniciar_puntos_al_reiniciar_el_juego) {
       preguntas_correctas = 0
       preguntas_hechas = 0
     }
     npreguntas = [];
     document.getElementById("pantalla-inicial").style.display = "block";
     document.getElementById("pantalla-juego").style.display = "none";
   }
 }
 npreguntas.push(n);
 preguntas_hechas++;

 escogerPregunta(n);
}

function escogerPregunta(n) {
 pregunta = interprete_bp[n];
 select_id("categoria").innerHTML = pregunta.categoria;
 select_id("pregunta").innerHTML = pregunta.pregunta;
 select_id("numero").innerHTML = n + 1;
 let pc = preguntas_correctas;
 if (preguntas_hechas > 1) {
   select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
 } else {
   select_id("puntaje").innerHTML = "";
 }

 style("imagen").objectFit = pregunta.objectFit;
 desordenarRespuestas(pregunta);
 if (pregunta.imagen) {
   select_id("imagen").setAttribute("src", pregunta.imagen);
   style("imagen").height = "150px";
   style("imagen").width = "100%";
 } else {
   style("imagen").height = "0px";
   style("imagen").width = "0px";
   setTimeout(() => {
     select_id("imagen").setAttribute("src", "");
   }, 500);
 }
}

function desordenarRespuestas(pregunta) {
 posibles_respuestas = [
   pregunta.respuesta,
   pregunta.incorrecta1,
   pregunta.incorrecta2,
   pregunta.incorrecta3,
 ];
 posibles_respuestas.sort(() => Math.random() - 0.5);

 select_id("btn1").innerHTML = posibles_respuestas[0];
 select_id("btn2").innerHTML = posibles_respuestas[1];
 select_id("btn3").innerHTML = posibles_respuestas[2];
 select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
 if (suspender_botones) {
   return;
 }
 suspender_botones = true;
 if (posibles_respuestas[i] == pregunta.respuesta) {
   preguntas_correctas++;
   btn_correspondiente[i].style.background = "greenyellow";
 } else {
   btn_correspondiente[i].style.background = "orangered";
 }
 for (let j = 0; j < 4; j++) {
   if (posibles_respuestas[j] == pregunta.respuesta) {
     btn_correspondiente[j].style.background = "greenyellow";
     break;
   }
 }
 setTimeout(() => {
   reiniciar();
   suspender_botones = false;
 }, 3000);
}

function reiniciar() {
 for (const btn of btn_correspondiente) {
   btn.style.background = "white";
 }
 escogerPreguntaAleatoria();
}

function select_id(id) {
 return document.getElementById(id);
}

function style(id) {
 return select_id(id).style;
}

function readText(ruta_local) {
 var texto = null;
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", ruta_local, false);
 xmlhttp.send();
 if (xmlhttp.status == 200) {
   texto = xmlhttp.responseText;
 }
 return texto;
}

function comenzarJuego(){
   
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  
}