const { Usuario } = require("../models/Usuario");

class RepositorioDeUsuario {
  buscarTodos() {
    return Usuario.buscarTodos();
  }

  buscarPeloID(id) {
    return Usuario.buscarPeloId(id);
  }

  criar(usuario) {
    return usuario.salvar();
  }

  buscarPeloEmail(email) {
    return Usuario.buscarPeloEmail(email);
  }

  atualizar(id, dadosNovos) {
    return Usuario.atualizar(id, dadosNovos)
  }

  deletar(id) {
    return Usuario.deletarUmUsuario(id)
  }
}

module.exports = new RepositorioDeUsuario();
