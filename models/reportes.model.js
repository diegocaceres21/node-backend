import mongoose from "mongoose";

const reportesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    gestion:{
        type: String
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model("Reporte", reportesSchema);