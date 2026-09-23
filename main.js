
import express from "express"
import dotenv from "dotenv"

import petsRoute from "./routes/pets.route.js"
import petsApiRoute from "./api/routes/pets.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"

dotenv.config()

const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(petsRoute)
app.use(petsApiRoute)
app.use(usuariosApiRoute)

app.listen(3333, () => console.log("Funcionando... en http://localhost:3333"))