import axios from 'axios';
import 'dotenv/config'
// Create a new Tarifario
export const logInSiaan = async (req, res) => {
    //res.cookie("token_ucb", response.headers.get('token'))
    res.status(200).json({ message: 'Login exitoso' });
    /*try {
        const response = await axios.post(`https://backend2.ucb.edu.bo/Authentication/api/v1/Authentication/LogInEmail`, req.body);
        res.cookie("token_ucb", response.headers.get('token'))
        //res.cookie("tokenexpiry", response.headers.get('tokenexpiry'))
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }*/
};

// Get all Tarifarios
export const obtenerOfertaAcademicaPorCarrera = async (req, res) => {
    const carreraId = req.query.carreraId;
    const idPeriodo = req.query.idPeriodo;
    const token = process.env.TOKEN_UCB; // Obtener el token del header de la solicitud entrante
    const uniquecode = process.env.UNIQUE_CODE

    try {
        const response = await axios.get(
            `https://backend.ucb.edu.bo/Academico/api/v1/Academico/Procesos/OfertaDeMaterias/ObtenerListaOfertaDeMaterias?idCarrera=${carreraId}&idPeriodoAcademico=${idPeriodo}&tamanoDePagina=200`,
            {
                headers: {
                    'Token': token,
                    'Uniquecode': uniquecode// Incluir el token en el header de la solicitud axios
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const obtenerTiposDePrograma = async (req, res) => {
    const idRegional = req.query.idRegional;
    const idPeriodoAcademico = req.query.idPeriodoAcademico;
    const token = process.env.TOKEN_UCB; // Obtener el token del header de la solicitud entrante
    const uniquecode = process.env.UNIQUE_CODE
    try {
        const response = await axios.get(
            `https://backend.ucb.edu.bo/Academico/api/v1/Academico/Procesos/OfertaDeMaterias/ObtenerTipoSubDepartamentoOferta?idRegional=${idRegional}&idPeriodoAcademico=${idPeriodoAcademico}`,
            {
                headers: {
                    'Token': token,
                    'Uniquecode': uniquecode// Incluir el token en el header de la solicitud axios
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerSedePersona = async (req, res) => {
    const token = process.env.TOKEN_UCB; // Obtener el token del header de la solicitud entrante
    const uniquecode = process.env.UNIQUE_CODE
    try {
        const response = await axios.get(
            `https://backend2.ucb.edu.bo/Authentication/api/v1/General/ParametrosDesdeToken`,
            {
                headers: {
                    'Token': token,
                    'Uniquecode': uniquecode// Incluir el token en el header de la solicitud axios
                }
            }
        );
        res.status(200).json(response.data.datos.personaRegionales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const obtenerIdCarrerasDepartamento = async (req, res) => {
    const idRegional = req.query.idRegional;
    const idPeriodoAcademico = req.query.idPeriodoAcademico;
    const idTipo = req.query.idTipo;
    const token = process.env.TOKEN_UCB; // Obtener el token del header de la solicitud entrante
    const uniquecode = process.env.UNIQUE_CODE
    try {
        const response = await axios.get(
            `https://backend.ucb.edu.bo/Academico/api/v1/Academico/Procesos/OfertaDeMaterias/ObtenerSubDepartamentosOferta?idRegional=${idRegional}&idTipo=${idTipo}&idPeriodoAcademico=${idPeriodoAcademico}&oficial=1`,
            {
                headers: {
                    'Token': token,
                    'Uniquecode': uniquecode// Incluir el token en el header de la solicitud axios
                }
            }
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
