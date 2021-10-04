const { response, request } = require('express');
//const { Usuario } = require('../models/user');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req = request, res = response) => {

    const { email, name, password } = req.body;

    try {

        //verifica que no exista el correo

        let usuario = await Usuario.findOne({ email });
        if (usuario) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario ya existe.'
            })
        }
        let usuarioDb = new Usuario(req.body);
        //encripta la contrasenna
        const salt = bcrypt.genSaltSync();
        usuarioDb.password = bcrypt.hashSync(password, salt);


        //generar json web token
        const token = await generarJWT(usuarioDb.id, name);

        //guardar el usuario en base de datos
        await usuarioDb.save();
        // se retorna las credenciales
        return res.status(200).json({
                ok: true,
                msj: 'usuario creado',
                uid: usuarioDb.id,
                name: usuarioDb.name,
                email: usuarioDb.email,
                token
            })
            //generar respuesta exitosa

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }




}
const loginUsuario = async(req = request, res = response) => {

    try {

        const { email, password } = req.body;


        let usuarioDb = await Usuario.findOne({ email });
        if (!usuarioDb) {

            return res.status(400).json({
                ok: false,
                msj: 'el usuario no existe.'
            })
        }
        //Confirmar si el password hace match
        if (!bcrypt.compareSync(password, usuarioDb.password)) {

            return res.status(401).json({
                ok: false,
                msj: 'password incorrecto'
            })
        }
        //generar json web token
        const token = await generarJWT(usuarioDb.id, usuarioDb.name);

        return res.status(200).json({
            ok: true,
            msj: 'usuario autenticado',
            uid: usuarioDb.id,
            name: usuarioDb.name,
            email: usuarioDb.email,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: 'debe comunicar al administrador'
        })
    }



}

const renewUsuario = async(req = request, res = response) => {

    const { uid, name, email } = req;

    //leer la base de datos
    let usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
        return res.status(400).json({
            ok: false,
            msj: 'el usuario no existe.'
        })
    }


    //generar json web token
    const token = await generarJWT(uid, name);


    //console.log(token);
    return res.status(200).json({
        ok: true,
        msj: 'renew de usuarios',
        uid,
        name,
        email: usuarioDb.email,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewUsuario
}