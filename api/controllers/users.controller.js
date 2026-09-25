import * as shelterService from "../../services/pets.service.js"

export async function getShelters(req, res) {
    try {
        const refugios = await shelterService.getShelters()
        res.status(200).json(refugios)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los refugios" })
    }
}

export async function createShelter(req, res) {
    try {
        const { name, photo, description } = req.body
        if (!name || !description) {
            return res.status(400).json({ message: "Nombre y descripción son requeridos" })
        }
        const refugio = await shelterService.createShelter({ name, photo, description })
        res.status(201).json(refugio)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el refugio" })
    }
}

export async function getPetsByShelter(req, res) {
    try {
        const id = req.params.id
        const mascotas = await shelterService.getPetsByShelterId(id)
        res.status(200).json(mascotas)
    } catch (error) {
        res.status(500).json({ message: "Error al traer las mascotas del refugio" })
    }
}