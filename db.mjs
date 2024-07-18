import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://diegocaceres:nzOIp45JnXqywNNX@cluster0.kocnpnk.mongodb.net/horarios");
        console.log("DB is connected")
    } catch(error){
        console.log(error);
    }
}