import Reporte from "../models/reportes.model.js";
import Horario from "../models/opcion-horario.model.js";
export const getReporteById = async (req, res) => {
    const reporte = await Reporte.findById(req.params.id)
    if(!reporte) return res.status(404).json
    res.json(reporte)
}
export const getAllReportes = async (req, res) => {
    try {
        const reportes = await Reporte.find()
        res.json(reportes)
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const createReporte = async (req, res) => {
    try {
        const { nombre, gestion, url } = req.body;

        // Find the highest "opcion" for the given "carrera"

        const newReporte = new Reporte({
            nombre: nombre,
            gestion: gestion,
            url: url,
        });

        const savedReporte = await newReporte.save();

        res.json(savedReporte);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the Reporte" });
    }
};

export const updateReporte = async (req, res) => {
    const reporte = await Reporte.findByIdAndUpdate(req.params.id, req.body)
    if(!reporte) return res.status(404).json({message: "No se encontro ningun reporte"})
    res.json(reporte)
}
export const deleteReporte = async (req, res) => {
    const reporte = await Reporte.findByIdAndDelete(req.params.id)
    if(!reporte) return res.status(404).json({message: "No se encontro ningun reporte"})
    res.sendStatus(204)
}
