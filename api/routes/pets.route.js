/*import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"

const router = Router()

router.get("/api/mascotas", petController.getPets)
router.get("/api/mascotas/:id", petController.getPetById)
router.post("/api/mascotas", petController.savePet)
router.put("/api/mascotas/:id", petController.replacePet)
router.patch("/api/mascotas/:id", petController.updatePet)
router.delete("/api/mascotas/:id", petController.deletePet)

export default router*/

import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"

const router = Router()

router.get("/api/mascotas", petController.getPets)
router.get("/api/mascotas/:id", petController.getPetsByTitle)
router.post("/api/mascotas", petController.savePets)
router.put("/api/mascotas/:id", petController.replacePets)
router.patch("/api/mascotas/:id", petController.updatePets)
router.delete("/api/mascotas/:id", petController.deletePets)
router.post("/api/mascotas/:id/review", petController.savePetsReview)

export default router