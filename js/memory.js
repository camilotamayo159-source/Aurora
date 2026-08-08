/* ==========================================
        CAPÍTULO 3 - PRIMER RECUERDO
========================================== */

function iniciarPrimerRecuerdo() {

    // ==========================
    // ELEMENTOS
    // ==========================

    const polaroid = document.getElementById("firstPolaroid");
    const tarjeta = document.getElementById("memoryCard");
    const texto = document.getElementById("memoryText");
    const boton = document.getElementById("nextMemory");

    // ==========================
    // REINICIAR ESTADO
    // ==========================

    texto.textContent = "";

    boton.classList.remove("showButton");
    boton.classList.add("hiddenButton");

    tarjeta.classList.remove("show");

    polaroid.classList.remove("polaroid-show");
    polaroid.classList.remove("polaroid-breath");

    // Reiniciar animación
    void polaroid.offsetWidth;

    // ==========================
    // ANIMACIÓN POLAROID
    // ==========================

    polaroid.classList.add("polaroid-show");

    // Esperar a que termine la caída

    setTimeout(() => {


        tarjeta.classList.add("show");

        // Escribir texto un poco después

        setTimeout(() => {

            escribirTexto(

                texto,

                "Ese día no solo celebrabas un año más de vida... sin saberlo, también empezabas a regalarme recuerdos que todavía hoy siguen haciéndome sonreír.",

                32,

                () => {

                    boton.classList.remove("hiddenButton");
                    boton.classList.add("showButton");

                }

            );

        }, 500);

    }, 1800);

}


/* ==========================================
        BOTÓN CONTINUAR
========================================== */

const nextMemory = document.getElementById("nextMemory");

if (nextMemory) {

    nextMemory.addEventListener("click", () => {

        iniciarTimeline();

    });

}