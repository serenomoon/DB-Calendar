/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();


const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

router.post( 
    '/new', 
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ], 
    crearUsuario 
);



router.post( 
    '/', 
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ], 
    loginUsuario 
);



router.get( '/renew', jwtValidator, revalidarToken );

module.exports = router;