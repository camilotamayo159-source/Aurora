/*=========================================
            GALERÍA
=========================================*/

const galeria = [

    "assets/img/gallery/01.jpg",
    "assets/img/gallery/02.jpg",
    "assets/img/gallery/03.jpg",
    "assets/img/gallery/04.jpg",
    "assets/img/gallery/05.jpg",
    "assets/img/gallery/06.jpg",
    "assets/img/gallery/07.jpg",
    "assets/img/gallery/08.jpg",
    "assets/img/gallery/09.jpg",
    "assets/img/gallery/10.jpg",
    "assets/img/gallery/11.jpg",
    "assets/img/gallery/12.jpg",

    "assets/img/gallery/13.jpg",
    "assets/img/gallery/14.jpg",
    "assets/img/gallery/15.jpg",
    "assets/img/gallery/16.jpg",
    "assets/img/gallery/17.jpg",
    "assets/img/gallery/18.jpg",
    "assets/img/gallery/19.jpg",
    "assets/img/gallery/20.jpg",
    "assets/img/gallery/21.jpg",
    "assets/img/gallery/22.jpg",
    "assets/img/gallery/23.jpg",
    "assets/img/gallery/24.jpg"

];

let coleccionActual = 1;

function cargarColeccion(numero){

    const grid = document.getElementById("galleryGrid");

    grid.innerHTML="";

    const inicio=(numero-1)*12;

    const fin=inicio+12;

    for(let i=inicio;i<fin;i++){

        const foto=document.createElement("img");

        foto.src=galeria[i];

        foto.className="gallery-photo";

        foto.onclick=()=>{

            abrirFoto(galeria[i]);

        };

        grid.appendChild(foto);

    }

}

function siguienteColeccion(){

    if(coleccionActual===1){

        coleccionActual=2;

        cargarColeccion(2);

        document.getElementById("nextGallerySection").textContent=
        "Continuar nuestra historia →";

    }

    else{

        iniciarCapitulo7();

    }

}

document.addEventListener("click",(e)=>{

    if(e.target.id==="nextGallerySection"){

        siguienteColeccion();

    }

});