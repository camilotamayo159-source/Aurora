/* ==========================================
                LOGIN AURORA
========================================== */

/* ==========================================
            ELEMENTOS
========================================== */

const input = document.getElementById("password");
const button = document.getElementById("loginButton");
const message = document.getElementById("message");

/* ==========================================
        FORMATO AUTOMÁTICO DE FECHA
========================================== */

input.addEventListener("input", () => {

    let valor = input.value.replace(/\D/g, "");

    valor = valor.substring(0, 8);

    if (valor.length > 4) {

        valor = valor.replace(
            /(\d{2})(\d{2})(\d+)/,
            "$1/$2/$3"
        );

    } else if (valor.length > 2) {

        valor = valor.replace(
            /(\d{2})(\d+)/,
            "$1/$2"
        );

    }

    input.value = valor;

});

/* ==========================================
            VALIDAR FECHA
========================================== */

button.addEventListener("click", validarLogin);

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        validarLogin();

    }

});

/* ==========================================
            LOGIN
========================================== */

function validarLogin() {

    const fechaCorrecta = "05/04/2025";

    if (input.value === fechaCorrecta) {

        loginCorrecto();

    } else {

        loginIncorrecto();

    }

}

/* ==========================================
        LOGIN CORRECTO
========================================== */

function loginCorrecto() {

    message.textContent = "Bienvenida, amor ❤️";
    message.style.color = "#7dffb3";
    message.classList.add("show");

    const login = document.querySelector(".login");

    login.classList.add("fade-out");

    setTimeout(() => {

        mostrarCapitulo(2);

        iniciarBienvenida();

    }, 2500);

}

/* ==========================================
        LOGIN INCORRECTO
========================================== */

function loginIncorrecto() {

    message.textContent = "Mmm... esa no parece ser nuestra fecha 💔";
    message.style.color = "#ff7d95";
    message.classList.add("show");

    input.focus();

}