const { response, request } = require('express');

const jwt = require('jsonwebtoken');

const validaJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({
            ok: false,
            msj: 'error en el token.'
        })
    }

    try {
        const { payload } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = payload.uid;
        req.name = payload.name;
        req.email = payload.email;

    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            ok: false,
            msj: 'token no valido'
        })
    }




    next();
};


module.exports = {
    validaJWT
}