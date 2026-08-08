/* ==========================================
                AURORA ENGINE
========================================== */

let capituloActual = 1;

/* ==========================================
            MOSTRAR CAPÍTULO
========================================== */

function mostrarCapitulo(numero){

    // Ocultar todos
    const capitulos=document.querySelectorAll(".chapter");

    capitulos.forEach(capitulo=>{

        capitulo.classList.add("hidden");
        capitulo.classList.remove("fade-in");
        capitulo.classList.remove("fade-out");

    });

    // Buscar el capítulo
    const siguiente=document.getElementById(`chapter${numero}`);

    if(!siguiente){

        console.error(`No existe chapter${numero}`);
        return;

    }

    // Scroll
    if(numero>=4){

        document.body.style.overflowY="auto";

    }else{

        document.body.style.overflowY="hidden";

    }

    // Mostrar capítulo
    siguiente.classList.remove("hidden");

    // Reiniciar animación
    void siguiente.offsetWidth;

    siguiente.classList.add("fade-in");

    setTimeout(()=>{

        siguiente.classList.remove("fade-in");

    },900);

    capituloActual=numero;

}

/* ==========================================
        SIGUIENTE CAPÍTULO
========================================== */

function siguienteCapitulo(){

    mostrarCapitulo(capituloActual+1);

}

/* ==========================================
        CAPÍTULO ANTERIOR
========================================== */

function capituloAnterior(){

    if(capituloActual>1){

        mostrarCapitulo(capituloActual-1);

    }

}

/*=========================================
        INICIO DESARROLLADOR
=========================================*/

window.addEventListener("load",()=>{

    if(!DEV_MODE) return;

    mostrarCapitulo(START_CHAPTER);

});