const express = require("express");
const controladorDeUsuario = require("../controllers/controladorDeUsuario");
const rotasDeUsuario = express.Router();

rotasDeUsuario.get("/todos", controladorDeUsuario.pegarTodos);

rotasDeUsuario.get("/:id", controladorDeUsuario.pegarUmPeloID);

rotasDeUsuario.post("/cadastrar", controladorDeUsuario.cadastrar);
rotasDeUsuario.post("/conectar", controladorDeUsuario.conectar);

rotasDeUsuario.put("/:id", controladorDeUsuario.atualizar);
rotasDeUsuario.delete("/:id", controladorDeUsuario.deletar);

module.exports = rotasDeUsuario;
