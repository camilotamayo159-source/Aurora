/*=========================================
       /*=========================================
            CAPÍTULO 4
=========================================*/

function iniciarTimeline(){

    mostrarCapitulo(4);

    const frase=document.getElementById("timelinePhrase");
    const intro=document.querySelector(".timeline-intro");
    const contenedor=document.getElementById("timelineContainer");

    frase.textContent="";

    escribirTexto(

        frase,

        "Toda historia se construye con pequeños momentos...\n\nAlgunos duran apenas unos segundos...\n\npero permanecen para siempre. ❤️",

        40,

        ()=>{

            setTimeout(()=>{

                intro.classList.add("fade-out");

                setTimeout(()=>{

                    intro.style.display="none";

                    contenedor.classList.remove("hidden");

                    construirTimeline();

                    animarTimeline();

                },1000);

            },2000);

        }

    );

}


/*=========================================
        CONSTRUIR TIMELINE
=========================================*/

function construirTimeline(){

    const lista=document.getElementById("timelineList");

    lista.innerHTML="";

    recuerdos.forEach((recuerdo,index)=>{

        const lado=index%2===0?"left":"right";

        const item=document.createElement("div");

        item.className=`timeline-item ${lado}`;

        item.innerHTML=crearRecuerdo(recuerdo,index);

        lista.appendChild(item);

    });

    const final=document.createElement("div");

final.className="timeline-ending";

final.id="timelineEnding";

final.innerHTML=`

   <h2 class="ending-heart">❤️</h2>

    <p id="endingText"></p>

    <button
        id="continueStory"
        class="hiddenButton">

        Continuar nuestra historia →

    </button>

`;

lista.appendChild(final);

}


/*=========================================
        CREAR RECUERDO
=========================================*/

function crearRecuerdo(r,index){

    let media="";

    if(r.fotos.length>0){

        // Si el recuerdo tiene video
        if(r.video){

            media=`

            <img
                class="timeline-image"
                src="${r.fotos[0]}"
            >

            <button
                class="play-memory"
                onclick="event.stopPropagation();abrirVideo('${r.video}')">

                ❤️ Reproducir recuerdo

            </button>

            `;

        }

        // Si solo tiene fotos
        else{

            media=`

            <img
                class="timeline-image"
                src="${r.fotos[0]}"
                onclick="abrirFoto('${r.fotos[0]}')"
            >

            `;

        }

    }

    else{

        media=`

        <div class="timeline-heart">

            ❤️

        </div>

        `;

    }

    return`

    <div class="timeline-card">

        ${media}

        <h3>${r.fecha}</h3>

        <h2>${r.titulo}</h2>

        <p>${r.frase}</p>

    </div>

    `;

}


/*=========================================
        ANIMACIÓN SCROLL
=========================================*/

function animarTimeline(){

    const items=document.querySelectorAll(".timeline-item");

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:.35

    });

    items.forEach(item=>observer.observe(item));

    const ending=document.getElementById("timelineEnding");

const finalObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

    ending.classList.add("show");

    escribirFinalTimeline();

}

    });

},{

    threshold:.4

});

finalObserver.observe(ending);

}

/*=========================================
            GALERÍA
=========================================*/

let archivosGaleria=[];
let indiceActual=0;


/*=========================================
        ABRIR GALERÍA
=========================================*/

function abrirGaleria(lista){

    archivosGaleria=lista;

    indiceActual=0;

    mostrarArchivo();

}


/*=========================================
        MOSTRAR ARCHIVO
=========================================*/

function mostrarArchivo(){

    const modal=document.getElementById("galleryModal");

    modal.classList.remove("hidden");

    modal.classList.add("show");


    let viejo=document.getElementById("galleryMedia");

    if(viejo){

        viejo.remove();

    }


    const archivo=archivosGaleria[indiceActual];

    let media;


    if(archivo.toLowerCase().endsWith(".mp4")){

        media=document.createElement("video");

        media.controls=true;

        media.autoplay=true;

    }

    else{

        media=document.createElement("img");

    }


    media.id="galleryMedia";

    media.src=archivo;


    modal.appendChild(media);


    crearControles();

}


/*=========================================
        CONTROLES
=========================================*/

function crearControles(){

    document.querySelectorAll(".gallery-nav").forEach(e=>e.remove());


    if(archivosGaleria.length<=1){

        return;

    }


    const modal=document.getElementById("galleryModal");


    const anterior=document.createElement("button");

    anterior.className="gallery-nav";

    anterior.innerHTML="❮";


    anterior.style.left="30px";


    anterior.onclick=(e)=>{

        e.stopPropagation();

        indiceActual--;

        if(indiceActual<0){

            indiceActual=archivosGaleria.length-1;

        }

        mostrarArchivo();

    };


    const siguiente=document.createElement("button");

    siguiente.className="gallery-nav";

    siguiente.innerHTML="❯";


    siguiente.style.right="30px";


    siguiente.onclick=(e)=>{

        e.stopPropagation();

        indiceActual++;

        if(indiceActual>=archivosGaleria.length){

            indiceActual=0;

        }

        mostrarArchivo();

    };


    modal.appendChild(anterior);

    modal.appendChild(siguiente);

}


/*=========================================
        CERRAR
=========================================*/

window.addEventListener("DOMContentLoaded",()=>{

    const modal=document.getElementById("galleryModal");

    const cerrar=document.getElementById("closeGallery");


    cerrar.onclick=()=>{

        cerrarGaleria();

    };


    modal.onclick=(e)=>{

        if(e.target===modal){

            cerrarGaleria();

        }

    };

});


function cerrarGaleria(){

    const modal=document.getElementById("galleryModal");

    modal.classList.remove("show");

    modal.classList.add("hidden");


    let media=document.getElementById("galleryMedia");

    if(media){

        media.remove();

    }


    document.querySelectorAll(".gallery-nav").forEach(e=>e.remove());

}

/*=========================================
        FOTO
=========================================*/

function abrirFoto(src){

    const modal=document.getElementById("galleryModal");

    modal.innerHTML=`

        <span id="closeGallery">✕</span>

        <img
            id="galleryImage"
            src="${src}">

    `;

    modal.classList.remove("hidden");
    modal.classList.add("show");

    document.getElementById("closeGallery").onclick=cerrarModal;

    modal.onclick=(e)=>{

        if(e.target===modal){

            cerrarModal();

        }

    };

}


/*=========================================
        VIDEO
=========================================*/

function abrirVideo(src){

   if(src.includes("primeras-flores")){

        crearPetalos();

    }


    const modal=document.getElementById("galleryModal");

    modal.innerHTML=`

        <span id="closeGallery">✕</span>

        <video
            id="galleryVideo"
            controls
            autoplay>

            <source src="${src}" type="video/mp4">

        </video>

    `;

    modal.classList.remove("hidden");
    modal.classList.add("show");

    document.getElementById("closeGallery").onclick=cerrarModal;

    modal.onclick=(e)=>{

        if(e.target===modal){

            cerrarModal();

        }

    };

}


/*=========================================
        CERRAR
=========================================*/

function cerrarModal(){

    detenerPetalos();

    const modal=document.getElementById("galleryModal");

    modal.classList.remove("show");

    modal.classList.add("hidden");

}



/*=========================================
        FINAL DEL TIMELINE
=========================================*/

let finalEscrito=false;

function escribirFinalTimeline(){

    if(finalEscrito) return;

    finalEscrito=true;

    const texto=document.getElementById("endingText");

    escribirTexto(

        texto,

        "Y esto...\n\napenas es el comienzo...",

        45,

        ()=>{

            setTimeout(()=>{

                document
                    .getElementById("continueStory")
                    .classList
                    .remove("hiddenButton");

            },700);

        }

    );

}

document.addEventListener("click",(e)=>{

    if(e.target.id==="continueStory"){

        iniciarCapitulo5();

    }

});

