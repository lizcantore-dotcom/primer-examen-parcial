/*import * as movieService from "../../services/pets.service.js"

export async function getPets(req, res) {
    try {
        const filtros = req.query
        const pets = await petsService.getPets(filtros)
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPetsByTitle(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.getPetsByTitle(id)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function savePets(req, res) {
    try {
        console.log(req.body)
        const pets = await petsService.guardarPets(req.body)

        if (pets) { //Object.key( pets ).length > 0
            res.status(200).json(pets)
        } else {
            res.status(400).json({ message: "El nombre de la mascota ya esta registrado" })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function deletePets(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.eliminarPetsLogico(id)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar la mascota" })
    }
}

export async function replacePets(req, res) {
    try {
        const title = req.params.title
        const pets = await petsService.editarPets(title, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar la mascota" })
    }
}

export async function updatePets(req, res) {
    try {
        const title = req.params.title
        const petsActual = await petsService.getPetsByTitle(title)
        req.body = {
            "title": req.body.title ?? petsActual?.title,
            "name": req.body.name ?? petsActual?.name,                     
            "year": req.body.year ?? petsActual?.year,
            "raza": req.body.raza ?? peliculaActual?.raza,
            "tamaño": req.body.tamaño ?? peliculaActual?.tamaño,
        }
        const pets = await petsService.editarPets(title, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar la mascota" })
    }
}

export async function savePetsReview(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.savePetsReview(id, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo comentar" })
    }
}*/

import * as petsService from "../../services/pets.service.js"

export async function getPets(req, res) {
    try {
        const filtros = req.query
        const pets = await petsService.getPets(filtros)
        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPetsByTitle(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.getPetsByTitle(id)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function savePets(req, res) {
    try {
        console.log(req.body)
        const pets = await petsService.guardarPets(req.body)

        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(400).json({ message: "El nombre de la mascota ya esta registrado" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function deletePets(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.eliminarPetsLogico(id)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar la mascota" })
    }
}

export async function replacePets(req, res) {
    try {
        const id = req.params.id || req.params.title
        const pets = await petsService.editarPets(id, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar la mascota" })
    }
}

export async function updatePets(req, res) {
    try {
        const id = req.params.id || req.params.title
        const petsActual = await petsService.getPetsByTitle(id)
        req.body = {
            "name": req.body.name ?? petsActual?.name,
            "description": req.body.description ?? petsActual?.description,
            "section": req.body.section ?? petsActual?.section,
            "raza": req.body.raza ?? petsActual?.raza,
            "tamaño": req.body.tamaño ?? petsActual?.tamaño,
        }
        const pets = await petsService.editarPets(id, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo modificar la mascota" })
    }
}

export async function savePetsReview(req, res) {
    try {
        const id = req.params.id
        const pets = await petsService.savePetsReview(id, req.body)
        if (pets) {
            res.status(200).json(pets)
        } else {
            res.status(404).json({ message: "Mascota no encontrada" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo comentar" })
    }
}
