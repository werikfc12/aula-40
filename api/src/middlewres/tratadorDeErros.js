const { HttpError } = require("../errors/HttpError");

function tratadorDeErros(error, _req, res, _next) {
    if (error instanceof HttpError) {
        return res.status(error.status).json({erro: error.message});
    }
    res.status(500).json({erro: error.message});
}


module.exports = tratadorDeErros;