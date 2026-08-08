/*==================================================
                    CAPÍTULO 9
==================================================*/

const textoCarta = `Hola, mi amor. ❤️

Si llegaste hasta aquí, primero quiero darte las gracias por haber recorrido todo este pequeño viaje. Cada foto, cada recuerdo, cada canción y cada palabra que viste antes de esta carta tienen un solo propósito: recordarte lo mucho que significas para mí.

Quería hacerte algo diferente. No comprarte un regalo que con el tiempo pudiera guardarse en un cajón, sino regalarte un momento. Uno que pudieras abrir cuando lo necesitaras y que, aunque fuera por unos minutos, te sacara una sonrisa.

Sé que estos últimos días no han sido fáciles para ti.

Te he visto cansada, estresada, preocupada por tantas cosas al mismo tiempo. A veces quisiera tener una especie de botón mágico para quitarte todo ese peso de encima y dejarte solamente la tranquilidad que tanto mereces. Ojalá pudiera hacerlo.

Como no puedo, decidí hacer esto.

Quería construir un lugar donde, aunque fuera por un ratito, pudieras olvidarte del ruido, de las responsabilidades, de las preocupaciones y simplemente recordar que hay alguien que piensa en ti con muchísimo cariño.

Quiero que nunca olvides algo.

No tienes que ser perfecta para que yo te ame.

No tienes que sonreír todos los días.

No tienes que demostrarle nada al mundo para tener un lugar enorme en mi corazón.

Puedes tener días malos.

Puedes sentirte cansada.

Puedes querer descansar.

Y aun así, seguirás siendo esa persona que logra iluminar mis días simplemente con existir.

Gracias por cada conversación, por cada abrazo, por cada risa, por cada momento compartido y hasta por esos silencios que, de alguna manera, también se sienten especiales cuando estoy contigo.

Si alguna vez vuelves a sentir que todo pesa demasiado, quiero que recuerdes algo muy simple.

No estás sola.

Aquí estoy yo.

Quizá no pueda resolver todos tus problemas, pero sí puedo caminar a tu lado mientras los enfrentas. Y si algún día sientes que ya no puedes más, entonces descansa un momento. Yo esperaré contigo.

Ojalá esta pequeña sorpresa haya conseguido exactamente lo que quería desde el principio: hacerte sonreír, aunque solo fuera durante unos minutos.

Porque si lo logré... entonces todo el tiempo que pasé construyendo esta historia ya valió completamente la pena.

Y antes de terminar, quiero que te quedes con una última idea.

Dentro de unos años, probablemente olvidemos la fecha de alguna foto o el lugar exacto donde ocurrió algún recuerdo. Pero hay algo que espero que nunca cambie: las ganas de seguir creando nuevos recuerdos contigo.

Todavía nos queda muchísimo por vivir.

Muchísimas fotografías por tomar.

Muchísimas canciones por escuchar.

Muchísimas razones nuevas que añadir a aquellas cien.

Y, sobre todo, muchísimos "te amo" por decir.

Así que... esto no es el final.

Es solo otra página de una historia que espero que siga escribiéndose durante mucho, mucho tiempo.

No sé qué estará pasando por tu cabeza el día que vuelvas a leer esta carta. Tal vez estés muy feliz. Tal vez estés cansada. O tal vez solo necesites un pequeño abrazo.

Sea cual sea ese momento, quiero que estas palabras siempre te recuerden lo mismo:

Eres profundamente amada.

Y siempre habrá alguien deseando verte sonreír.`;


let escribiendo = false;

function iniciarCapitulo9(){

    mostrarCapitulo(9);

    document.querySelector(".letter-intro").classList.remove("hidden");
    document.getElementById("letterScene").classList.add("hidden");

    document.getElementById("letterViewer").classList.remove("show");
    document.getElementById("letterViewer").classList.add("hidden");

    document.getElementById("letterContent").textContent="";

    document.getElementById("signature").classList.remove("show");
    document.getElementById("postdata").classList.remove("show");
    document.getElementById("continueFinal").style.opacity="0";

    escribiendo=false;

}

/*==============================
        BOTÓN INTRO
==============================*/

document.getElementById("openLetterButton").onclick=()=>{

    document.querySelector(".letter-intro").classList.add("hidden");

    setTimeout(()=>{

        document.getElementById("letterScene").classList.remove("hidden");

    },500);

};

/*==============================
            SOBRE
==============================*/

document.getElementById("envelope").onclick = () => {

    const sobre = document.getElementById("envelope");

    sobre.style.pointerEvents = "none";

    sobre.classList.add("open");

    document.querySelector(".envelope-tip").style.opacity = "0";

    setTimeout(() => {

        // Empieza la música antes de mostrar la carta
        const musica = document.getElementById("loveSong");

        musica.currentTime = 0;
        musica.volume = 0.02;

        musica.play().catch(() => {});

        // Fade In
        let volumen = 0.02;

        const fade = setInterval(() => {

            volumen += 0.01;

            musica.volume = Math.min(volumen, 0.12);

            if (volumen >= 0.12) {

                clearInterval(fade);

            }

        },250);

        document.getElementById("letterScene").classList.add("hidden");

        const visor = document.getElementById("letterViewer");

        visor.classList.remove("hidden");

        requestAnimationFrame(() => {

            visor.classList.add("show");

            escribirCarta();

        });

    },2300);

};

/*==============================
        ESCRIBIR CARTA
==============================*/

async function escribirCarta(){

    if(escribiendo) return;

    escribiendo=true;

    const caja=document.getElementById("letterContent");

    for(let i=0;i<textoCarta.length;i++){

        caja.textContent+=textoCarta[i];

        let espera=28;

        if(textoCarta[i]===",") espera=170;

        if(textoCarta[i]===".") espera=380;

        if(textoCarta[i]==="\n") espera=550;

        await new Promise(r=>setTimeout(r,espera));

    }

    // Espera dos segundos después de terminar la carta
await new Promise(r => setTimeout(r, 2000));

// Suena la campanita
const ding = new Audio("audio/ding.mp3");

ding.volume = 0.35;

ding.play().catch(() => {});

// Pequeña pausa para que coincida con el sonido
await new Promise(r => setTimeout(r, 600));

// Aparece la firma
document.getElementById("signature").classList.add("show");

// Espera un poco más
await new Promise(r => setTimeout(r, 1400));

// Aparece la P.D.
document.getElementById("postdata").classList.add("show");

// Espera nuevamente
await new Promise(r => setTimeout(r, 1200));

// Finalmente aparece el botón
const boton = document.getElementById("continueFinal");

boton.style.opacity = "1";
boton.style.transform = "translateY(0)"; }

/*==============================
        CONTINUAR
==============================*/

document.getElementById("continueFinal").onclick=()=>{

    iniciarCapitulo10();

};