/*==================================================
                CAPÍTULO 10
==================================================*/

async function iniciarCapitulo10(){

    mostrarCapitulo(10);

    // Reinicia todos los elementos
    document.getElementById("finalTitle").textContent="";
    document.getElementById("finalText1").textContent="";
    document.getElementById("finalText2").textContent="";

    document.getElementById("finalHeart").classList.remove("show");

    document.getElementById("auroraLogo").classList.remove("showFinal");
    document.getElementById("auroraSubtitle").classList.remove("showFinal");
    document.getElementById("finalWord").classList.remove("showFinal");
    document.getElementById("restartAurora").classList.remove("showFinal");

    await esperar(1200);

    await escribirFinal(
        "finalTitle",
        "Gracias por llegar hasta aquí."
    );

    document.getElementById("finalTitle").classList.add("showFinal");

    await esperar(1800);

    await escribirFinal(
        "finalText1",
        "Esta historia fue hecha con muchísimo cariño."
    );

    document.getElementById("finalText1").classList.add("showFinal");

    await esperar(1800);

    await escribirFinal(
        "finalText2",
        "Y espero que, cada vez que vuelvas, te recuerde lo inmensamente especial que eres."
    );

    document.getElementById("finalText2").classList.add("showFinal");

    await esperar(2500);

    const corazon=document.getElementById("finalHeart");

    corazon.classList.add("show");

    corazon.style.animation="heartbeat 2.5s infinite";

    await esperar(1800);

    document.getElementById("auroraLogo").classList.add("showFinal");

    await esperar(900);

    document.getElementById("auroraSubtitle").classList.add("showFinal");

    await esperar(2200);

    document.getElementById("finalWord").classList.add("showFinal");

    await esperar(1800);

    document.getElementById("finalDate").classList.add("showFinal");

    await esperar(5000);

// Empieza lentamente el fundido
document
    .getElementById("fadeToBlack")
    .classList
    .add("show");

// La música sigue...
await esperar(2500);

// Aparece el botón
document
    .getElementById("restartAurora")
    .classList
    .add("showFinal");
}

/*======================================*/

function esperar(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

/*======================================*/

async function escribirFinal(id,texto){

    const elemento=document.getElementById(id);

    elemento.textContent="";

    for(let i=0;i<texto.length;i++){

        elemento.textContent+=texto[i];

        await esperar(35);

    }

}

/*======================================*/

document.getElementById("restartAurora").onclick=()=>{

    const fade=document.getElementById("fadeToBlack");

    fade.style.transition="2s";

    fade.style.opacity="1";

    setTimeout(()=>{

        location.reload();

    },2000);

};


/*=========================================
            ESTRELLAS
=========================================*/

for(let i=0;i<140;i++){

    const estrella=document.createElement("div");

    estrella.className="starFinal";

    estrella.style.left=Math.random()*100+"%";

    estrella.style.top=Math.random()*100+"%";

    estrella.style.animationDelay=Math.random()*5+"s";

    estrella.style.opacity=Math.random();

    document.getElementById("starsFinal").appendChild(estrella);

}

/*=========================================
            PARTÍCULAS
=========================================*/

setInterval(()=>{

    const p=document.createElement("div");

    p.className="particle";

    p.style.left=Math.random()*100+"%";

    p.style.animationDuration=(7+Math.random()*6)+"s";

    document.getElementById("particlesFinal").appendChild(p);

    setTimeout(()=>{

        p.remove();

    },14000);

},450);