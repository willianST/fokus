const adicionarTarefaBt = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const btCancelar = document.querySelector(".app__form-footer__button--cancel");
const paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");

const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
};

function criaElementoTarefa(tarefa) {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const p = document.createElement("p");
    p.textContent = tarefa.descricao;
    p.classList.add("app__section-task-list-item-description");

    const button = document.createElement("button");
    button.classList.add("app_button-edit");
    button.onclick = () => {
        const editTarefa = prompt("Qual o novo nome da tarefa?", p.textContent);
        if(editTarefa !== null) {
            const novaDescricao = editTarefa.trim();
            if(novaDescricao !== "") {
                p.textContent = novaDescricao;
                tarefa.descricao = novaDescricao;
                atualizarTarefas();
                alert("Tarefa atualizada com sucesso!");
            } else {
                alert("O nome da tarefa não pode ser vazio!");
            }
        }
    };


    const imgButton = document.createElement("img");
    imgButton.setAttribute("src", "/imagens/edit.png");
    button.append(imgButton);

    li.append(svg);
    li.append(p);
    li.append(button);

    if(tarefa.completa) {
        li.classList.add("app__section-task-list-item-complete");
        button.setAttribute("disabled", "disabled");
    } else {
        li.onclick = () => {
            document.querySelectorAll(".app__section-task-list-item-active").forEach(elemento => {
                elemento.classList.remove("app__section-task-list-item-active")
            });
            if(tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = "";
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return
            }
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            li.classList.add("app__section-task-list-item-active");
        }
    }

    return li
};

adicionarTarefaBt.addEventListener("click", () => {
    formAdicionarTarefa.classList.toggle("hidden");
});

formAdicionarTarefa.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    };
    tarefas.push(tarefa);
    const elementoTarefa = criaElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textArea.value = "";
    formAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criaElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

const limparFormulario = () => {
    textArea.value = '';
    formAdicionarTarefa.classList.add("hidden");
};

btCancelar.addEventListener("click", limparFormulario);

document.addEventListener("focoFinalizado", () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
        liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
        liTarefaSelecionada.querySelector("button").setAttribute("disabled", "disabled");
        tarefaSelecionada.completa = true;
        atualizarTarefas();
    }
})