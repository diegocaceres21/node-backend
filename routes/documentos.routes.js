import {Router} from 'express'
import {authRequired} from "../middlewares/validateToken.js";
import {
    //obtenerCartaDeTraspasoFormatoPdf,
    obtenerCartaDeTraspasoFormatoWord, obtenerDocumentosEntregadosFormatoWord
} from "../controllers/documentos.controller.js";


const router = Router();
router.post('/documentos/obtenerCartaDeTraspasoFormatoWord', authRequired,obtenerCartaDeTraspasoFormatoWord)
router.post('/documentos/obtenerDocumentosEntregadosFormatoWord', authRequired,obtenerDocumentosEntregadosFormatoWord)
//router.post('/documentos/obtenerCartaDeTraspasoFormatoPdf/:userId', authRequired,obtenerCartaDeTraspasoFormatoPdf)

export default router