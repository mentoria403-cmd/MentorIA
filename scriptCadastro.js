function cadastrar() {

  const nome = document.getElementById("nome").value;

  const email = document.getElementById("email").value;

  const senha = document.getElementById("senha").value;

  const confirmarSenha =
    document.getElementById("confirmarSenha").value;

  // VALIDAÇÃO

  if(
    nome === "" ||
    email === "" ||
    senha === "" ||
    confirmarSenha === ""
  ) {

    alert("Preencha todos os campos!");

    return;
  }

  if(senha !== confirmarSenha) {

    alert("As senhas não coincidem!");

    return;
  }

  // CRIANDO OBJETO USUÁRIO

  const usuario = {
    nome: nome,
    email: email,
    senha: senha
  };

  // SALVANDO NO LOCAL STORAGE

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

  alert("Cadastro realizado com sucesso!");

  // REDIRECIONAR

  window.location.href = "login.html";
}