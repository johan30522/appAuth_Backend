const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewUsuario } = require('../controllers/auth');
const { validaCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/validar-jwt');


const router = Router();

//crear un nuevo usuario
router.post('/new', [
    //validaciones
    check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email ingresado no es valido'),
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe contener al menos 3 caracteres'),
    check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña es mínimo de 6 caracteres'),
    validaCampos
], crearUsuario);
//login de usuario 
router.post('/', [
        //validaciones
        check('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Email ingresado no es valido'),
        check('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña es mínimo de 6 caracteres'),
        validaCampos
    ], loginUsuario)
    //validar y revalidar token
router.get('/renew', validaJWT, renewUsuario)



module.exports = router;