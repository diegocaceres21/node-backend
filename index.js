import app from "./app.mjs"
import { connectDB } from "./db.mjs"
import 'dotenv/config'

const PORT = process.env.PORT | 3000
connectDB();
app.listen(PORT, () =>{
    console.log('Server en puerto', 3000)
})
