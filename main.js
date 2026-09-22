import express from "express"
import dotenv from "dotenv"

import mascotasWebRoute from "./routes/pets-route.js"
import mascotasApiRoute from "./api/routes/pets-routes.js"

dotenv.config()

const app = express()
const PORT = 3333

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(mascotasWebRoute)
app.use(mascotasApiRoute)

app.listen(PORT, () => console.log(`Funcionando en http://localhost:${PORT}`))