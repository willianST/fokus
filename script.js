const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaImput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");

const playAudio = new Audio("/sons/play.wav");
const pauseAudio = new Audio("/sons/pause.mp3");
const acabouAudio = new Audio("/sons/beep.mp3");

let temporizadorEmSegundos = 5;
let intervaloId = null;

const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

musicaImput.addEventListener("change", () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alteraContexto(contexto) {
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
    alteraContexto("foco");
    focoBt.classList.add("active");
})

curtoBt.addEventListener("click", () => {
    alteraContexto("descanso-curto");
    curtoBt.classList.add("active");
})

longoBt.addEventListener("click", () => {
    alteraContexto("descanso-longo");
    longoBt.classList.add("active");
})

const contagemRegressiva = () => {
    temporizadorEmSegundos -= 1
    console.log("Temporizador: " + temporizadorEmSegundos);
    
    if (temporizadorEmSegundos <= 0) {
        acabouAudio.play();
        temporizadorEmSegundos = 5;
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
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}