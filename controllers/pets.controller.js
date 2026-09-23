import * as petsView from "../views/pets.view.js"
import * as petsService from "../services/pets.service.js"

export async function getPets(req, res) {
    try {
        const filtros = req.query
        const pets = await petsService.getPets(filtros)
        res.send(petsView.createPetsPage(pets))
    } catch (error) {
        console.error("Error en getPets:", error)
        res.status(500).send(petsView.pageError(500, "Error interno del servidor"))
    }
}

export async function getPetsByTitle(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.getPetsByTitle(id)
        if (!pets) {
            return res.send(petsView.pageError(404, "Mascota no encontrada"))
        }
        res.send(petsView.createDetailPage(pets))
    } catch (error) {
        console.error("Error en getPetsByTitle:", error)
        res.send(petsView.pageError(404, "Mascota no encontrada"))
    }
}

export async function nuevaPetsForm(req, res) {
    try {
        res.send(petsView.nuevaPetForm())
    } catch (error) {
        console.error("Error en nuevaPetsForm:", error)
        res.send(petsView.pageError(404, "Página no encontrada"))
    }
}

export async function guardarPets(req, res) {
    try {
        const pets = await petsService.guardarPets(req.body)
        res.redirect(`/mascotas/${pets._id || ''}`)
    } catch (error) {
        console.error("Error en guardarPets:", error)
        res.send(petsView.pageError(400, "No se pudo agregar la mascota"))
    }
}

export async function editarPetsForm(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.getPetsByTitle(id)
        if (!pets) return res.send(petsView.pageError(404, "Mascota no encontrada"))
        res.send(petsView.editarPetForm(pets))
    } catch (error) {
        console.error("Error en editarPetsForm:", error)
        res.send(petsView.pageError(400, "No se pudo editar la mascota"))
    }
}

export async function editarPets(req, res) {
    try {
        const id = req.params.id
        await petsService.editarPets(id, req.body)
        res.redirect(`/mascotas/${id}`)
    } catch (error) {
        console.error("Error en editarPets:", error)
        res.send(petsView.pageError(400, "No se pudo editar la mascota"))
    }
}

export async function eliminarPetsForm(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.getPetsByTitle(id)
        if (!pets) return res.send(petsView.pageError(404, "Mascota no encontrada"))
        res.send(petsView.eliminarPetForm(pets))
    } catch (error) {
        console.error("Error en eliminarPetsForm:", error)
        res.send(petsView.pageError(400, "No se pudo borrar la mascota"))
    }
}

export async function eliminarPets(req, res) {
    try {
        const id = req.params.id
        await petsService.eliminarPetsLogico(id)
        res.redirect("/mascotas")
    } catch (error) {
        console.error("Error en eliminarPets:", error)
        res.send(petsView.pageError(400, "No se pudo borrar la mascota"))
    }
}