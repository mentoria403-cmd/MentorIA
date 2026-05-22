// PEGAR USUÁRIO

const usuario =
  JSON.parse(localStorage.getItem("usuario"));

// MOSTRAR NOME

if(usuario) {

  document.getElementById(
    "mensagemUsuario"
  ).innerText =
    `Olá, ${usuario.nome} 👋`;
}

// TAREFAS

let tarefas =
  JSON.parse(localStorage.getItem("tarefas"))
  || [];

function adicionarTarefa() {

  const input =
    document.getElementById("tarefaInput");

  const texto = input.value;

  if(texto === "") {

    alert("Digite uma tarefa!");

    return;
  }

  tarefas.push({
  texto: texto,
  concluida: false
});
  localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
  );

  input.value = "";

  renderizarTarefas();
}

function renderizarTarefas() {

  const lista =
    document.getElementById("listaTarefas");

  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {

    lista.innerHTML += `

      <li>

        <span style="
          text-decoration:
          ${tarefa.concluida ? "line-through" : "none"};
        ">

          ${tarefa.texto}

        </span>

        <div>

          <button
            onclick="concluirTarefa(${index})"
          >
            ✔
          </button>

          <button
            class="remover-btn"
            onclick="removerTarefa(${index})"
          >
            X
          </button>

        </div>

      </li>
    `;
  });

  atualizarProgresso();
}

function removerTarefa(index) {

  tarefas.splice(index, 1);

  localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
  );

  renderizarTarefas();
}
function concluirTarefa(index) {

  tarefas[index].concluida =
    !tarefas[index].concluida;

  localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
  );

  renderizarTarefas();
}

// METAS

let metas =
  JSON.parse(localStorage.getItem("metas"))
  || [];

function adicionarMeta() {

  const input =
    document.getElementById("metaInput");

  const texto = input.value;

  if(texto === "") {

    alert("Digite uma meta!");

    return;
  }

  metas.push(texto);

  localStorage.setItem(
    "metas",
    JSON.stringify(metas)
  );

  input.value = "";

  renderizarMetas();
}

function renderizarMetas() {

  const lista =
    document.getElementById("listaMetas");

  lista.innerHTML = "";

  metas.forEach((meta, index) => {

    lista.innerHTML += `
      <li>
        ${meta}

        <button
          class="remover-btn"
          onclick="removerMeta(${index})"
        >
          X
        </button>
      </li>
    `;
  });
}

function removerMeta(index) {

  metas.splice(index, 1);

  localStorage.setItem(
    "metas",
    JSON.stringify(metas)
  );

  renderizarMetas();
}

// SAIR

function sair() {

  window.location.href = "login.html";
}

// INICIAR

renderizarTarefas();

renderizarMetas();
function atualizarProgresso() {

  const barra =
    document.getElementById("barraProgresso");

  const texto =
    document.getElementById("textoProgresso");

  if(tarefas.length === 0) {

    barra.style.width = "0%";

    texto.innerText = "0% concluído";

    return;
  }

  const concluidas =
    tarefas.filter(
      tarefa => tarefa.concluida
    ).length;

  const porcentagem =
    Math.round(
      (concluidas / tarefas.length) * 100
    );

  barra.style.width =
    porcentagem + "%";

  texto.innerText =
    porcentagem + "% concluído";
}