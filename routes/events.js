/*
    Rutas de usuarios / Event
    host + /api/event
*/

const { Router } = require('express');

const { isDate } = require('../helpers/isDate');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');

const router = Router();

router.use( jwtValidator )


router.get( '/', getEventos );

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        fieldValidator
    ], 
    crearEvento 
);

router.put( 
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        fieldValidator
    ],  
    actualizarEvento );

router.delete( '/:id', eliminarEvento );

module.exports = router;


