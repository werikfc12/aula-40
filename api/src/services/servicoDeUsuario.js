const z = require("zod");
const jwt = require("jsonwebtoken");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/HttpError");
const repositorioDeUsuario = require("../repositories/repositorioDeUsuario");

class ServicoDeUsuario {
  buscarTodos() {
    return RepositorioDeUsuario.buscarTodos();
  }

  pegarPeloID(id) {
    if (!id) {
      throw new Error("O ID não foi informado");
    }

    return RepositorioDeUsuario.buscarPeloID(id);
  }

  cadastrar(nome, email, cpf, senha) {
    const userSchema = z.object({
      nome: z
        .string({ required_error: "O nome é obrigatório." })
        .trim()
        .min(3, { message: "O nome deve conter pelo menos três caractere." }),
      email: z
        .string({ required_error: "O email é obrigatório." })
        .email({ message: "O email deve ser um email válido." }),
      cpf: z
        .string({ required_error: "O CPF é obrigatório." })
        .trim()
        .min(11, { message: "O CPF deve conter 11 caracteres." }),
      senha: z
        .string({ required_error: "A senha é obrigatória." })
        .trim()
        .min(8, { message: "A senha deve conter pelo menos 8 caracteres." })
    });

    const validacao = userSchema.safeParse({ nome, email, cpf, senha });

    if (validacao.success === false) {
      return validacao.error.format();
    }

    const usuario = new Usuario(nome, email, cpf, senha);
    return RepositorioDeUsuario.criar(usuario);
  }

  conectar(email, senha) {
    const usuarioEncontrado = RepositorioDeUsuario.buscarPeloEmail(email);
    if (!usuarioEncontrado) {
      throw new HttpError(404, "Usuário não encontrado.");
    }

    const autenticado = usuarioEncontrado.compararSenha(senha);
    if (!autenticado) {
      throw new HttpError(401, "Senha incorreta.");
    }

    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
        role: usuarioEncontrado.role || "student"
      },
      "senhaSecreta",
      { expiresIn: "1d" }
    );
    // Atualizar o token do usuário

    return token;
  }

  atualizar(id, dados) {
    const { nome, email, cpf, senha } = dados;
    const dadosExistentes = this.pegarPeloID(id);

    const dadosAtualizados = {
      nome: nome ?? dadosExistentes.nome,
      email: email ?? dadosExistentes.email,
      cpf: cpf ?? dadosExistentes.cpf,
      senha: senha ?? dadosExistentes.senha
    };

    return repositorioDeUsuario.atualizar(id, dadosAtualizados);
  }

  deletar(id) {
    return repositorioDeUsuario.deletar(id)
  }
}

module.exports = new ServicoDeUsuario();
