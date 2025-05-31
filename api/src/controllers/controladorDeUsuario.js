const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeUsuario {
  pegarTodos(_req, res) {

      const usuarios = servicoDeUsuario.buscarTodos();

      if (usuarios.length === 0) {
        return res
          .status(404)
          .json({ messagem: "Nenhum usuário foi encontrado." });
      }

      res.status(200).json(usuarios);
    
  }

  pegarUmPeloID(req, res) {
    {
      const id = req.params.id;
      const usuario = servicoDeUsuario.pegarPeloID(id);

      if (usuario.length === 0) {
        return res
          .status(404)
          .json({ messagem: "Nenhum usuário foi encontrado." });
      }

      res.status(200).json(usuario);
    }  {
      res
        .status(500)
        .json({ erro: error.message || "Erro ao buscar usuários." });
    }
  }

  cadastrar(req, res) {
    try {
      const { nome, email, cpf, senha } = req.body;
      const resposta = servicoDeUsuarios.cadastrar(nome, email, cpf, senha);

      if (resposta instanceof Error) {
        return res.status(400).json(resposta.message);
      }

      res.status(201).json(resposta);
    } catch (error) {
      res
        .status(500)
        .json({ erro: error.message || "Erro ao buscar usuários." });
    }
  }

  conectar(req, res) {
    try {
      const { email, senha } = req.body;
      const resposta = servicoDeUsuario.conectar(email, senha);

      if (resposta instanceof HttpError) {
        return res.status(resposta.status).json({ erro: resposta.message });
      }

      res.status(200).json(resposta);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res.status(500).json({ erro: error.message });
    }
  }

  atualizar(req, res) {
    try {
      const id = req.params.id;

      const usuarioExistente = servicoDeUsuario.pegarPeloID(id);
      if (usuarioExistente.length === 0) {
        return res
          .status(404)
          .json({ messagem: "Nenhum usuário foi encontrado." });
      }

      const dadosNovos = req.body;

      const usuarioAtualizado = servicoDeUsuario.atualizar(
        id,
        dadosNovos
      );

      res.status(200).json(usuarioAtualizado)
    } catch (error) {
      res
        .status(500)
        .json({ erro: error.message || "Erro ao atualizar usuários." });
    }
  }

  deletar (req,res){
    try {
      const id = req.params.id;
      servicoDeUsuario.deletar(id);

      res.status(204).json({ message: "Deletado com sucesso"});
    } catch (error) {
      res
        .status(500)
        .json({ erro: error.message || "Erro ao buscar usuários." });
    }
  }
}

module.exports = new ControladorDeUsuario();
