import { Router } from "express"
import * as petController from "../controllers/pets-controller.js"

const router = Router()

router.get("/", (req, res) => res.redirect("/mascotas"))
router.get("/mascotas", petController.getPets)
router.get("/mascotas/nuevo", petController.nuevaPetForm)
router.post("/mascotas/nuevo", petController.guardarPet)
router.get("/mascotas/editar/:id", petController.editarPetForm)
router.post("/mascotas/editar/:id", petController.editarPet)
router.get("/mascotas/eliminar/:id", petController.eliminarPetForm)
router.post("/mascotas/eliminar/:id", petController.eliminarPet)
router.get("/mascotas/:id", petController.getPetById)

export default router