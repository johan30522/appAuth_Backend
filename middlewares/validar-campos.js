const { response, request } = require('express');
const { validationResult } = require('express-validator');

const validaCampos = (req = request, res = response, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msj: errors.mapped()
        })
    }
    next();
};


module.exports = {
    validaCampos
}