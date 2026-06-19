const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const startPauseText = startPauseBt.querySelector("span");
const startPauseIcon = startPauseBt.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector("#timer")

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const playAudio = new Audio("/sons/play.wav");
const pauseAudio = new Audio("/sons/pause.mp3");
const acabouAudio = new Audio("/sons/beep.mp3");

let temporizadorEmSegundos = 1500;
let tempoPadraoDoContexto = 1500;
let intervaloId = null;

musica.loop = true;

musicaInput.addEventListener("change", () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alteraContexto(contexto, tempo) {
    temporizadorEmSegundos = tempo;
    tempoPadraoDoContexto = tempo;
    mostrarTempo()
    botoes.forEach(function(botao) {
        botao.classList.remove("active");
    })
    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;  
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

focoBt.addEventListener("click", () => {
    alteraContexto("foco", 1500);
    focoBt.classList.add("active");
})

curtoBt.addEventListener("click", () => {
    alteraContexto("descanso-curto", 300);
    curtoBt.classList.add("active");
})

longoBt.addEventListener("click", () => {
    alteraContexto("descanso-longo", 900);
    longoBt.classList.add("active");
})

const contagemRegressiva = () => {
    temporizadorEmSegundos -= 1;
    mostrarTempo();
    
    if (temporizadorEmSegundos <= 0) {
        acabouAudio.play();
        temporizadorEmSegundos = tempoPadraoDoContexto;
        setTimeout(() => {
            alert("Tempo finalizado");
        }, 50);
        zerar();
        return;
    }
}

startPauseBt.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        pauseAudio.play()
        zerar()
        return
    }
    acabouAudio.pause();
    acabouAudio.currentTime = 0;
    playAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startPauseText.textContent = "Pausar";
    startPauseIcon.setAttribute("src", "/imagens/pause.png")
}

function zerar() {
    clearInterval(intervaloId);
    startPauseText.textContent = "Começar";
    startPauseIcon.setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(temporizadorEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();