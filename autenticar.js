function login() {

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;

  // PEGAR USUÁRIOS

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios"))
    || [];

  // BUSCAR USUÁRIO

  const usuarioEncontrado =
    usuarios.find(usuario =>
      usuario.email === email &&
      usuario.senha === senha
    );

  // VALIDAR

  if(usuarioEncontrado) {

    // SALVAR LOGADO

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarioEncontrado)
    );

    alert("Login realizado!");

    window.location.href = "dashboard.html";

  } else {

    alert("Email ou senha incorretos!");
  }
}