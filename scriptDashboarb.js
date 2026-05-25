// PEGAR USUÁRIO

const usuario =
  JSON.parse(localStorage.getItem("usuario"));
  const emailUsuario = usuario.email;

// MOSTRAR NOME

if(usuario) {

  document.getElementById(
    "mensagemUsuario"
  ).innerText =
    `Olá, ${usuario.nome} 👋`;
}

// TAREFAS

let tarefas =
  JSON.parse(localStorage.getItem(`tarefas_${emailUsuario}`))
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
  `tarefas_${emailUsuario}`,
    JSON.stringify(tarefas)
  );

  input.value = "";

  renderizarTarefas();
  atualizarCards();
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
  `tarefas_${emailUsuario}`,
    JSON.stringify(tarefas)
  );

  renderizarTarefas();
  atualizarCards();
}
function concluirTarefa(index) {

  tarefas[index].concluida =
    !tarefas[index].concluida;

  localStorage.setItem(
  `tarefas_${emailUsuario}`,
    JSON.stringify(tarefas)
  );

  renderizarTarefas();
  atualizarCards();
}

// METAS

let metas =
  JSON.parse(localStorage.getItem(`metas_${emailUsuario}`))
  || [];

function adicionarMeta() {

  const input =
    document.getElementById("metaInput");

  const texto = input.value;

  if(texto === "") {

    alert("Digite uma meta!");

    return;
  }

  metas.push({
  texto: texto,
  concluida: false
});

  localStorage.setItem(
  `metas_${emailUsuario}`,
    JSON.stringify(metas)
  );

  input.value = "";

  renderizarMetas();
  atualizarCards();
}

function renderizarMetas() {

  const lista =
    document.getElementById("listaMetas");

  lista.innerHTML = "";

  metas.forEach((meta, index) => {

    lista.innerHTML += `

      <li>

        <span style="
          text-decoration:
          ${meta.concluida ? "line-through" : "none"};
        ">

          ${meta.texto}

        </span>

        <div>

          <button
            onclick="concluirMeta(${index})"
          >
            ✔
          </button>

          <button
            class="remover-btn"
            onclick="removerMeta(${index})"
          >
            X
          </button>

        </div>

      </li>
    `;
  });

  atualizarProgresso();

  atualizarCards();
}

function removerMeta(index) {

  metas.splice(index, 1);

  localStorage.setItem(
  `metas_${emailUsuario}`,
    JSON.stringify(metas)
  );

  renderizarMetas();
  atualizarCards();
}
function concluirMeta(index) {

  metas[index].concluida =
    !metas[index].concluida;

  localStorage.setItem(
  `metas_${emailUsuario}`,
    JSON.stringify(metas)
  );

  renderizarMetas();
  atualizarCards();
}

// CRONOGRAMA

let cronograma =
  JSON.parse(
    localStorage.getItem(`cronograma_${emailUsuario}`)) 
    || [];

function renderizarCronograma() {

  const dias = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo"
  ];

  // LIMPAR

  dias.forEach((dia) => {

    const coluna =
      document.getElementById(dia);

    coluna.innerHTML = "";
  });

  // RENDERIZAR

  cronograma.forEach((item, index) => {

    const coluna =
      document.getElementById(item.dia);

    const bloco =
      document.createElement("div");

    bloco.classList.add("estudo-item");

    bloco.innerHTML = `

      <div>

        <strong>${item.materia}</strong>

        <br>

        ${item.horario}

      </div>

      <button
        onclick="removerCronograma(${index})"
      >
        X
      </button>
    `;

    coluna.appendChild(bloco);
  });
}
function adicionarCronograma() {

  const materia =
    document.getElementById("materiaInput").value;

  const dia =
    document.getElementById("diaInput").value;

  const horario =
    document.getElementById("horarioInput").value;

  // VALIDAÇÃO

  if(
    materia.trim() === "" ||
    dia.trim() === "" ||
    horario.trim() === ""
  ) {

    alert("Preencha todos os campos!");

    return;
  }

  // OBJETO

  const novoEstudo = {
    materia: materia,
    dia: dia,
    horario: horario
  };

  // ADICIONAR

  cronograma.push(novoEstudo);

  // SALVAR

  localStorage.setItem(
    `cronograma_${emailUsuario}`,
    JSON.stringify(cronograma)
  );

  // LIMPAR FORM

  limparFormularioCronograma();

  // RENDERIZAR

  renderizarCronograma();

  atualizarCards();
}
function limparFormularioCronograma() {

  document.getElementById("materiaInput").value = "";

  document.getElementById("diaInput").value = "";

  document.getElementById("horarioInput").value = "";
}

// SAIR

function sair() {

  window.location.href = "login.html";
}

// INICIAR

renderizarTarefas();

renderizarMetas();
renderizarCronograma();
function atualizarProgresso() {

  const barra =
    document.getElementById("barraProgresso");

  const texto =
    document.getElementById("textoProgresso");

  // TOTAL

  const totalItens =
    tarefas.length + metas.length;

  if(totalItens === 0) {

    barra.style.width = "0%";

    texto.innerText = "0% concluído";

    return;
  }

  // TAREFAS CONCLUÍDAS

  const tarefasConcluidas =
    tarefas.filter(
      tarefa => tarefa.concluida
    ).length;

  // METAS CONCLUÍDAS

  const metasConcluidas =
    metas.filter(
      meta => meta.concluida
    ).length;

  // TOTAL CONCLUÍDO

  const totalConcluido =
    tarefasConcluidas + metasConcluidas;

  // PORCENTAGEM

  const porcentagem =
    Math.round(
      (totalConcluido / totalItens) * 100
    );

  barra.style.width =
    porcentagem + "%";

  texto.innerText =
    porcentagem + "% concluído";
}
function atualizarCards() {

  document.getElementById("cardTarefas")
    .innerText = tarefas.length + " Tarefas";

  document.getElementById("cardMetas")
    .innerText = metas.length + " Metas";

  document.getElementById("cardCronograma")
    .innerText = cronograma.length + " Horários";
}

