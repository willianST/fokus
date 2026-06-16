const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

function alteraContexto(contexto) {
    html.setAttribute("data-contexto", contexto);
}

focoBt.addEventListener("click", () => {
    alteraContexto("foco");
})

curtoBt.addEventListener("click", () => {
    alteraContexto("descanso-curto");
})

longoBt.addEventListener("click", () => {
    alteraContexto("descanso-longo");
})