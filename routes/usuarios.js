import {Router}  from 'express';
import {usuariosGet,usuariosPut,usuariosPost,usuariosDelete} from "../controllers/usuarios.js";
import {check} from "express-validator";
import {validarCampos} from "../middlewares/validar-campos.js";
import {esRolValido,esEmailUnico,existeUsuarioPorId} from "../helpers/db-validators.js";

const router = Router()

router.get('/',  usuariosGet)

router.put('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRolValido),
    validarCampos
] ,usuariosPut)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contrasenia','La contraseña debe ser mayor a 6 digitos').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(esEmailUnico),
    //check('role',"No es un role valido ").isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRolValido),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)

export {
    router
}