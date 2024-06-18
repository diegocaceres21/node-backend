import mongoose from "mongoose";

const periodoSchema = new mongoose.Schema({
    gestion: {
        type: String,
        required: true,
        unique: true,
    },
    idGestion:{
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
});
periodoSchema.pre('save', async function(next) {
    if (this.isModified('active') && this.active) {
        // If this document is being set to active, deactivate others
        await this.constructor.updateMany({ active: true }, { active: false });
    }
    next();
});
export default mongoose.model("Periodo", periodoSchema);