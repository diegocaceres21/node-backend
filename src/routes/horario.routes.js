import {Router} from 'express'
import {authRequired} from "../middlewares/validateToken.js";
import {getHorarios, getHorario, createHorario, deleteHorario, updateHorario} from "../controllers/horarios.controller.js"

const router = Router();
router.get('/horarios', authRequired,getHorarios)
router.get('/horarios/:id', authRequired,getHorario)
router.post('/horarios', authRequired,createHorario)
router.delete('/horarios/:id', authRequired,deleteHorario)
router.put('/horarios/:id', authRequired,updateHorario)

export default router