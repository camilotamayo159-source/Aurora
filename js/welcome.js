/* ==========================================
            BIENVENIDA AURORA
========================================== */

let bienvenidaIniciada = false;

/* ==========================================
        EFECTO MÁQUINA DE ESCRIBIR
========================================== */

function escribirTexto(elemento, texto, velocidad, callback) {

    let i = 0;

    elemento.textContent = "";

    const intervalo = setInterval(() => {

        elemento.textContent += texto.charAt(i);

        i++;

        if (i >= texto.length) {

            clearInterval(intervalo);

            if (callback) {

                callback();

            }

        }

    }, velocidad);

}

/* ==========================================
        INICIAR BIENVENIDA
========================================== */

function iniciarBienvenida() {

    // Evita que se ejecute dos veces
    if (bienvenidaIniciada) return;

    bienvenidaIniciada = true;

    const titulo = document.getElementById("welcomeTitle");
    const linea1 = document.getElementById("line1");
    const linea2 = document.getElementById("line2");
    const boton = document.getElementById("startJourney");

    // Reiniciar contenido
    titulo.textContent = "";
    linea1.textContent = "";
    linea2.textContent = "";

    boton.classList.remove("showButton");
    boton.classList.add("hiddenButton");

    escribirTexto(titulo, "Hola, Rossy ❤️", 80, () => {

        setTimeout(() => {

            escribirTexto(linea1, "Si estás viendo esto...", 45, () => {

                setTimeout(() => {

                    escribirTexto(
                        linea2,
                        "es porque recordaste el día en que comenzó nuestra historia.",
                        35,
                        () => {

                            setTimeout(() => {

                                boton.classList.remove("hiddenButton");
                                boton.classList.add("showButton");

                            }, 600);

                        }

                    );

                }, 500);

            });

        }, 500);

    });

}

/* ==========================================
        BOTÓN CAPÍTULO 3
========================================== */

const botonViaje = document.getElementById("startJourney");

if (botonViaje) {

    botonViaje.addEventListener("click", () => {

    mostrarCapitulo(3);

    iniciarPrimerRecuerdo();

});

}