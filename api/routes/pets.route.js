
import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"

const router = Router()

router.get("/api/mascotas", petController.getPets)
router.get("/api/mascotas/:id", petController.getPetsByTitle)
router.post("/api/mascotas", petController.savePets)
router.put("/api/mascotas/:id", petController.replacePets)
router.patch("/api/mascotas/:id", petController.updatePets)
router.delete("/api/mascotas/:id", petController.deletePets)

export default router