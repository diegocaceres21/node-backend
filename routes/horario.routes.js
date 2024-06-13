import {Router} from 'express'
import {authRequired} from "../middlewares/validateToken.js";
import {
    getHorarios,
    getHorario,
    createHorario,
    deleteHorario,
    updateHorario,
    getOpciones, getOpcion, getAllHorarios
} from "../controllers/horarios.controller.js"

const router = Router();
router.get('/horarios', authRequired,getHorarios)
router.get('/horarios/all', authRequired,getAllHorarios)
router.get('/horarios/opciones', authRequired,getOpciones)
router.get('/horarios/opciones/:opcion', authRequired,getOpcion)
router.get('/horarios/:id', authRequired,getHorario)
router.post('/horarios', authRequired,createHorario)
router.delete('/horarios/:id', authRequired,deleteHorario)
router.put('/horarios/:id', authRequired,updateHorario)

export default router