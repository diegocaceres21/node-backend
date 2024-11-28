import mongoose from "mongoose";

const horarioSchema = new mongoose.Schema({
    carrera :{
        type: String,
        required: true,
        trim: true,
        unique: false,
    },
    opcion :{
        type: Number,
        required: false,
        trim: true,
        unique: false
    },
    comentario:{
        type: String,
        required: false,
    },
    horario: [ {
        sigla:{
            type: String,
            required: true,
            trim: true,
            unique: false
        },
        materia:{
            type: String,
            required: true,
            trim: true,
            unique: false
        },
        paralelo:{
            type: String,
            required: true,
            trim: true,
            unique: false
        },
        horario:{
            type: String,
            required: true,
            trim: true,
            unique: false
        }
    }],
    tipo:{
        type: String,
        required: true,
        trim: true,
        unique: false,
        enum: ['TRASPASO', 'NUEVO']
    }
 },{
    timestamps: true
})

 export default mongoose.model('Horario', horarioSchema)