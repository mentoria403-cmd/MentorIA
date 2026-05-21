function login() {

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;

  // PEGAR USUÁRIO SALVO

  const usuarioSalvo =
    JSON.parse(localStorage.getItem("usuario"));

  if(usuarioSalvo === null) {

    alert("Nenhum usuário cadastrado!");

    return;
  }

  // VALIDAR LOGIN

  if(
    email === usuarioSalvo.email &&
    senha === usuarioSalvo.senha
  ) {

    alert("Login realizado com sucesso!");

    window.location.href = "dashboard.html";

  } else {

    alert("Email ou senha incorretos!");
  }
}