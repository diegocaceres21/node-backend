import express from 'express';
import {
    logInSiaan,
    obtenerIdCarrerasDepartamento,
    obtenerOfertaAcademicaPorCarrera, obtenerSedePersona,
    obtenerTiposDePrograma
} from "../controllers/siaan.controller.js";


const router = express.Router();

// Create a new Tarifario
router.post('/siaan/logIn', logInSiaan);
router.get('/siaan/obtenerAsignaturasPorCarrera', obtenerOfertaAcademicaPorCarrera);
router.get('/siaan/obtenerTiposDePrograma', obtenerTiposDePrograma);
router.get('/siaan/obtenerIdCarrerasDepartamento', obtenerIdCarrerasDepartamento);
router.get('/siaan/obtenerSedePersona', obtenerSedePersona);
// Get all Tarifarios


export default router;

