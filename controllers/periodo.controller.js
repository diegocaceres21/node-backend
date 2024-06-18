import Periodo from "../models/periodo.model.js";
export const getPeriodoById = async (req, res) => {
    const periodo = await Periodo.findById(req.params.id)
    if(!periodo) return res.status(404).json
    res.json(periodo)
}
export const getAllPeriodos = async (req, res) => {
    try {
        const periodos = await Periodo.find()
        res.json(periodos)
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const createPeriodo = async (req, res) => {
    try {
        const { gestion, idGestion} = req.body;

        // Find the highest "opcion" for the given "carrera"

        const newPeriodo = new Periodo({
            idGestion: idGestion,
            gestion: gestion,
            active: false,
        });

        const savedPeriodo = await newPeriodo.save();

        res.json(savedPeriodo);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the Reporte" });
    }
};

export const updatePeriodo = async (req, res) => {
    const periodo = await Periodo.findByIdAndUpdate(req.params.id, req.body)
    if(!periodo) return res.status(404).json({message: "No se encontro ningun Periodo"})
    res.json(periodo)
}

export const activarPeriodo = async (req, res) => {
    const periodo = await Periodo.findByIdAndUpdate(req.params.id, {active: true})
    if(!periodo) return res.status(404).json({message: "No se encontro ningun Periodo"})
    res.json(periodo)
}
export const deletePeriodo = async (req, res) => {
    const periodo = await Periodo.findByIdAndDelete(req.params.id)
    if(!periodo) return res.status(404).json({message: "No se encontro ningun reporte"})
    res.sendStatus(204)
}
