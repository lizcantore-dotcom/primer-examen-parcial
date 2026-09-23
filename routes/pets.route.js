import { Router } from "express"
import * as petController from "../controllers/pets.controller.js"
import * as shelterService from "../services/shelters.service.js"
import { createPage } from "../page/utils.js"

const router = Router()

// Rutas Web de Mascotas
//router.get("/", (req, res) => res.redirect("/mascotas"))
router.get("/mascotas", petController.getPets)
router.get("/mascotas/nuevo", petController.nuevaPetsForm)
router.post("/mascotas/nuevo", petController.guardarPets)
router.get("/mascotas/editar/:id", petController.editarPetsForm)
router.post("/mascotas/editar/:id", petController.editarPets)
router.get("/mascotas/eliminar/:id", petController.eliminarPetsForm)
router.post("/mascotas/eliminar/:id", petController.eliminarPets)
router.get("/mascotas/:id", petController.getPetsByTitle)

// Rutas Web de Refugios 
router.get("/refugios", async (req, res) => {
    try {
        const refugios = await shelterService.getShelters()
        let html = `
        <div class="mb-3">
            <a class="btn btn-outline-primary" href="/mascotas">← Volver a Mascotas</a>
        </div>
        <div class="row">`
        refugios.forEach(ref => {
            html += `
            <div class="col-md-4 mb-3">
                <div class="card h-100 shadow-sm">
                    <img src="${ref.photo || 'https://picsum.photos/400/225'}" class="card-img-top" style="height:180px; object-fit:cover;">
                    <div class="card-body">
                        <h5 class="card-title">${ref.name}</h5>
                        <p class="card-text text-muted">${ref.description}</p>
                        <a href="/refugios/${ref._id}/mascotas" class="btn btn-sm btn-info text-white">Ver sus mascotas</a>
                    </div>
                </div>
            </div>`
        })
        html += `</div>`
        res.send(createPage("Refugios Disponibles", html))
    } catch (error) {
        console.error("Error al cargar refugios:", error)
        res.status(500).send(createPage("Error", "<p>Error al cargar los refugios</p>"))
    }
})

router.get("/refugios/:id/mascotas", async (req, res) => {
    try {
        const mascotas = await shelterService.getPetsByShelterId(req.params.id)
        let html = `
        <div class="mb-3">
            <a class="btn btn-secondary" href="/refugios">← Volver a Refugios</a>
        </div>
        <ul class="list-group">`
        mascotas.forEach(pet => {
            html += `<li class="list-group-item"><strong>${pet.name}</strong> - ${pet.section} (${pet.size || pet.tamaño || 'Mediano'})</li>`
        })
        html += `</ul>`
        if (mascotas.length === 0) html += `<p class="text-muted mt-2">Este refugio aún no tiene mascotas asignadas.</p>`
        res.send(createPage("Mascotas del Refugio", html))
    } catch (error) {
        console.error("Error al cargar mascotas del refugio:", error)
        res.status(500).send(createPage("Error", "<p>Error al cargar las mascotas del refugio</p>"))
    }
})

export default router