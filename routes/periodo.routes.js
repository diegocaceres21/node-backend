import {Router} from 'express'
import {authRequired} from "../middlewares/validateToken.js";
import {
    activarPeriodo,
    createPeriodo,
    deletePeriodo,
    getAllPeriodos,
    getPeriodoById,
    updatePeriodo
} from "../controllers/periodo.controller.js";



const router = Router();

router.get('/periodos/all', authRequired,getAllPeriodos)
router.get('/periodos/:id', authRequired,getPeriodoById)
router.post('/periodos', authRequired,createPeriodo)
router.delete('/periodos/:id', authRequired,deletePeriodo)
router.put('/periodos/:id', authRequired,updatePeriodo)
router.put('/periodos/activar/:id', authRequired,activarPeriodo)

export default router