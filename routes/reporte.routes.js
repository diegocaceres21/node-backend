import {Router} from 'express'
import {authRequired} from "../middlewares/validateToken.js";
import {
    createReporte,
    deleteReporte,
    getAllReportes,
    getReporteById,
    updateReporte
} from "../controllers/reportes.controller.js";


const router = Router();

router.get('/reportes/all', authRequired,getAllReportes)
router.get('/reportes/:id', authRequired,getReporteById)
router.post('/reportes', authRequired,createReporte)
router.delete('/reportes/:id', authRequired,deleteReporte)
router.put('/reportes/:id', authRequired,updateReporte)

export default router