import express from "express";
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import horarioRoutes from "./routes/horario.routes.js"
import cors from 'cors';
import reporteRoutes from "./routes/reporte.routes.js";
import periodoRoutes from "./routes/periodo.routes.js";
import documentosRoutes from "./routes/documentos.routes.js";
import siaanRoutes from "./routes/siaan.routes.js";

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with the actual origin of your Angular app
    credentials: true,
    //exposedHeaders: ['Set-Cookie', 'Date']
};
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

app.use("/horariosbackend", authRoutes);
app.use("/horariosbackend", horarioRoutes);
app.use("/horariosbackend", reporteRoutes);
app.use("/horariosbackend", periodoRoutes);
app.use("/horariosbackend", documentosRoutes);
app.use("/horariosbackend", siaanRoutes);
export default app;
