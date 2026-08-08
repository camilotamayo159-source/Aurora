/*========================================
            PÉTALOS
========================================*/

let lluviaPetalos;

function crearPetalos(){

    const contenedor=document.getElementById("effectsContainer");

    lluviaPetalos=setInterval(()=>{

        const petalo=document.createElement("div");

        petalo.className="petal";

        petalo.textContent="🌸";

        petalo.style.left=Math.random()*100+"vw";

        petalo.style.animationDuration=
        (5+Math.random()*3)+"s";

        petalo.style.fontSize=
        (18+Math.random()*18)+"px";

        contenedor.appendChild(petalo);

        setTimeout(()=>{

            petalo.remove();

        },9000);

    },250);

}

function detenerPetalos(){

    clearInterval(lluviaPetalos);

}