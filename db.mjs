import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DB is connected")
    } catch(error){
        console.log(error);
    }
}