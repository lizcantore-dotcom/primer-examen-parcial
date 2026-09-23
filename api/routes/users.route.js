import { Router } from "express"
import * as shelterController from "../controllers/users.controller.js"

const router = Router()

// Rutas de Refugios (Parte 3)
router.get("/api/refugios", shelterController.getShelters)
router.post("/api/refugios", shelterController.createShelter)
router.get("/api/refugios/:id/mascotas", shelterController.getPetsByShelter)

export default router