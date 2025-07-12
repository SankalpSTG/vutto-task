import { config } from "dotenv"
config()
import express, { json } from "express"
import { connectDatabase } from "./config/db.config"
import AuthRouter from "./modules/auth/auth.routes"
import { GlobalErrorHandler } from "./misc/errors"
import cors from "cors"
import cookieParser from "cookie-parser"
import BikeAdRouter from "./modules/bike-ad/bike-ad.route"
const app = express()

if(process.env.ENVIRONMENT === "development"){
    console.log("Setting Development CORS")
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))
}else{
    console.log("Setting Production CORS")
    app.use(cors({
        origin: "https://vutto.latencot.com",
        credentials: true
    }))
}
app.use(json())
app.use(cookieParser())

app.use("/auth", AuthRouter)
app.use("/bike-ads", BikeAdRouter)

app.get("/", (req, res) => res.json({message: "Hello World!"}))

app.use(GlobalErrorHandler)

const startServer = async () => {
    await connectDatabase()
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server is Listening")
    })
}

startServer().then(() => {
    console.log("Server Started")
}).catch((error: any) => {
    console.log(error)
})