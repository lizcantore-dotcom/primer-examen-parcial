import { Router } from "express"
import * as petController from "../controllers/pets-controllers.js"

const router = Router()

router.get("/api/mascotas", petController.getPets)
router.get("/api/mascotas/:id", petController.getPetById)
router.post("/api/mascotas", petController.savePet)
router.put("/api/mascotas/:id", petController.replacePet)
router.patch("/api/mascotas/:id", petController.updatePet)
router.delete("/api/mascotas/:id", petController.deletePet)

export default router