function iniciarCapitulo8(){

    mostrarCapitulo(8);

    const audio = document.getElementById("loveSong");
    const boton = document.getElementById("musicButton");
    const vinilo = document.getElementById("vinyl");
    const brazo = document.getElementById("tonearm");
    const led = document.getElementById("powerLed");

    let reproduciendo = false;

    boton.onclick = () => {

        if(!reproduciendo){
            reproducir();
        }else{
            pausar();
        }

    };

    function reproducir(){

        reproduciendo = true;

        boton.textContent = "⏸ Pausar";

        led.classList.add("on");

        setTimeout(() => {
            vinilo.classList.add("playing");
        },300);

        setTimeout(() => {
            brazo.classList.add("playing");
        },700);

        setTimeout(() => {
            audio.play();
        },1000);

    }

    function pausar(){

        audio.pause();

        reproduciendo = false;

        boton.textContent = "▶ Reproducir";

        vinilo.classList.remove("playing");

        brazo.classList.remove("playing");

        led.classList.remove("on");

    }

    audio.onended = () => {

        pausar();

    };

    document.getElementById("continueLetter").onclick = () => {

        iniciarCapitulo9();

    };

}