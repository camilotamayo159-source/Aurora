/*=========================================
            CAPÍTULO 7
=========================================*/

let intervaloContador;

function iniciarCapitulo7(){

    mostrarCapitulo(7);

    animacionDias = false;

    document.getElementById("countdownTitle").style.opacity = "0";
    document.getElementById("countdownDate").style.opacity = "0";
    document.getElementById("countdownBox").style.opacity = "0";
    document.getElementById("countdownText").style.opacity = "0";
    document.getElementById("continueMusic").style.opacity = "0";

    setTimeout(()=>{

    const titulo = document.getElementById("countdownTitle");

    titulo.style.opacity = "1";

    escribirTexto(

        titulo,

        "Todo este tiempo...",

        55

    );

},900);

    setTimeout(()=>{

        document.getElementById("countdownDate").style.opacity="1";

    },2500);

    setTimeout(()=>{

        document.getElementById("countdownBox").style.opacity="1";

        iniciarContador();

    },3200);

    setTimeout(()=>{

        document.getElementById("countdownText").style.opacity="1";

    },4800);

    setTimeout(()=>{

        document.getElementById("continueMusic").style.opacity="1";

    },5600);

}

function iniciarContador(){

    clearInterval(intervaloContador);

    const fechaInicio = new Date("2025-04-05T00:00:00");

    actualizarContador(fechaInicio);

    intervaloContador = setInterval(()=>{

        actualizarContador(fechaInicio);

    },1000);

}

function actualizarContador(fechaInicio){

    const ahora = new Date();

    const diferencia = ahora - fechaInicio;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferencia % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (diferencia % (1000 * 60))
        / 1000
    );

    animarDias(dias);

    document.getElementById("hours").textContent =
    String(horas).padStart(2,"0");

    document.getElementById("minutes").textContent =
    String(minutos).padStart(2,"0");

    document.getElementById("seconds").textContent =
    String(segundos).padStart(2,"0");

}

let animacionDias = false;

function animarDias(destino){

    if(animacionDias){

        document.getElementById("days").textContent = destino;
        return;

    }

    animacionDias = true;

    let actual = 0;

    const incremento = Math.ceil(destino / 50);

    const intervalo = setInterval(()=>{

        actual += incremento;

        if(actual >= destino){

            actual = destino;

            clearInterval(intervalo);

        }

        document.getElementById("days").textContent = actual;

    },20);

}

document.addEventListener("click",(e)=>{

    if(e.target.id==="continueMusic"){

        iniciarCapitulo8();

    }

});