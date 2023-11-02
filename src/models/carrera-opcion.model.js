import mongoose from "mongoose";

const careerOptionSchema = new mongoose.Schema({
    carrera: {
        type: String,
        required: true,
        unique: true,
    },
    nextOption: {
        type: Number,
        default: 1,
    },
});

export default mongoose.model("CareerOption", careerOptionSchema);
