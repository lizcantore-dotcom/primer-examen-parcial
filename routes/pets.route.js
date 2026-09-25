
import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"

const router = Router()

router.get("/mascotas", petController.getPets)
router.get("/mascotas/nuevo", petController.nuevaPetsForm)
router.post("/mascotas/nuevo", petController.guardarPets)
router.get("/mascotas/editar/:id", petController.editarPetsForm)
router.post("/mascotas/editar/:id", petController.editarPets)
router.get("/mascotas/eliminar/:id", petController.eliminarPetsForm)
router.post("/mascotas/eliminar/:id", petController.eliminarPets)
router.get("/mascotas/:id", petController.getPetsByTitle)

router.get("/refugios", petController.getRefugiosWeb)
router.get("/refugios/:id/mascotas", petController.getRefugioMascotasWeb)

export default router