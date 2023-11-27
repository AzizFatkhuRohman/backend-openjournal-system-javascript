import express from 'express'
import database from './app/config/database.js'
import route from './app/routes/route.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
//port tempat backend berjalan
app.listen(process.env.PORT,()=>{
    console.log('Server running')
})

//cek koneksi basis data
try {
    await database.authenticate()
    console.log('Database Connected')
} catch (error) {
    console.log(error)
}
app.use(express.json())
app.use(route)