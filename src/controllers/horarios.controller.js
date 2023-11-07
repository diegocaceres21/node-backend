import Horario from "../models/opcion-horario.model.js";
export const getHorarios = async (req, res) => {
    const { carrera } = req.query;

    if (!carrera) {
        return res.status(400).json({ error: 'Query parameter carrera is required' });
    }
    const horarios = await Horario.find({ carrera: carrera })
    res.json(horarios)
}

export const getOpciones = async (req, res) => {
    const { carrera } = req.query;

    if (!carrera) {
        return res.status(400).json({ error: 'Query parameter carrera is required' });
    }

    try {
        const horarios = await Horario.find({ carrera: carrera }, { opcion: 1, _id: 0 });
        res.json(horarios.map(horario => horario.opcion));
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getOpcion = async (req, res) => {
    const { carrera } = req.query;

    if (!carrera) {
        return res.status(400).json({ error: 'Query parameter carrera is required' });
    }

    try {
        const horario = await Horario.findOne({ carrera: carrera , opcion: req.params.opcion});
        res.json(horario)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getHorario = async (req, res) => {
    const horario = await Horario.findById(req.params.id)
    if(!horario) return res.status(404).json
    res.json(horario)
}
export const createHorario = async (req, res) => {
    try {
        const { carrera, comentario, horario } = req.body;

        // Find the highest "opcion" for the given "carrera"
        const highestOption = await Horario.findOne({ carrera })
            .sort( { opcion: -1 })
            .select('opcion')
            .limit(1)
            .exec();

        let nextOption = 1;

        if (highestOption) {
            nextOption = highestOption.opcion + 1;
        }

        const newHorario = new Horario({
            carrera,
            opcion: nextOption,
            comentario,
            horario,
        });

        const savedHorario = await newHorario.save();

        res.json(savedHorario);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the Horario" });
    }
};

export const updateHorario = async (req, res) => {
    const horario = await Horario.findByIdAndUpdate(req.params.id, req.body)
    if(!horario) return res.status(404).json({message: "No se encontro ningun horario"})
    res.json(horario)
}
export const deleteHorario = async (req, res) => {
    const horario = await Horario.findByIdAndDelete(req.params.id)
    if(!horario) return res.status(404).json({message: "No se encontro ningun horario"})
    res.sendStatus(204)
}
