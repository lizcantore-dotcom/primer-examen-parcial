import { createDetailPage, createPetsPage } from "../views/pets.view.js"
import * as petsService from "../services/pets.service.js"
import * as petsView from "../views/pets.view.js"
import { createPage } from "../page/utils.js"

// Listado de mascotas
export async function getPets(req, res) {
    try {
        const filtros = req.query
        const pets = await petsService.getPets(filtros)
        res.send(createPetsPage(pets))
    } catch (error) {
        res.send(petsView.pageError(404, "Pagina no encontrada"))
    }
}

// Detalle de una mascota
export async function getPetsByTitle(req, res) {
    try {
        const id = req.params.id
        const pet = await petsService.getPetsByTitle(id)
        res.send(createDetailPage(pet))
    } catch (error) {
        res.send(petsView.pageError(404, "Mascota no encontrada"))
    }
}

// Formulario de nueva mascota
export async function nuevaPetsForm(req, res) {
    try {
        const refugios = await petsService.getShelters()
        res.send(petsView.nuevaPetForm(refugios))
    } catch (error) {
        res.send(petsView.pageError(404, "Pagina no encontrada"))
    }
}

// Guardar nueva mascota (POST)
export async function guardarPets(req, res) {
    try {
        const pet = await petsService.guardarPets(req.body)
        res.send(createDetailPage(pet))
    } catch (error) {
        res.send(petsView.pageError(400, "No se pudo agregar la mascota"))
    }
}

// Formulario de editar
export async function editarPetsForm(req, res) {
    try {
        const id = req.params.id
        const pet = await petsService.getPetsByTitle(id)
        const refugios = await petsService.getShelters()
        res.send(petsView.editarPetForm(pet, refugios))
    } catch (error) {
        res.send(petsView.pageError(400, "No se pudo editar la mascota"))
    }
}

// Guardar edición (POST)
export async function editarPets(req, res) {
    try {
        const id = req.params.id
        const pet = await petsService.editarPets(id, req.body)
        res.send(createDetailPage(pet))
    } catch (error) {
        res.send(petsView.pageError(400, "No se pudo editar la mascota"))
    }
}

// Eliminar mascota (POST)
export async function eliminarPets(req, res) {
    try {
        const id = req.params.id
        const pet = await petsService.eliminarPetsLogico(id)
        res.send(createDetailPage(pet))
    } catch (error) {
        res.send(petsView.pageError(400, "No se pudo borrar la mascota"))
    }
}

// confirmación de eliminación
export async function eliminarPetsForm(req, res) {
    try {
        const id = req.params.id
        const pet = await petsService.getPetsByTitle(id)
        res.send(petsView.eliminarPetForm(pet))
    } catch (error) {
        res.send(petsView.pageError(400, "No se pudo borrar la mascota"))
    }
}


// Listado de refugios web

export async function getRefugiosWeb(req, res) {
    try {
        const refugios = await petsService.getShelters()
        let html = `
        <div class="mb-3">
            <a class="btn btn-outline-primary" href="/mascotas">← Volver a Mascotas</a>
        </div>
        <div class="row">`
        refugios.forEach(ref => {
            html += `
            <div class="col-md-4 mb-3">
                <div class="card h-100 shadow-sm">
                    <img src="${ref.photo || 'https://picsum.photos/400/225'}" class="card-img-top shelter-card-img">
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
        res.send(petsView.pageError(500, "Error al cargar los refugios"))
    }
}

    // Detalle de mascotas por refugio
            
export async function getRefugioMascotasWeb(req, res) {
    try {
        const mascotas = await petsService.getPetsByShelterId(req.params.id)
        
        let html = `
        <div class="mb-4 d-flex justify-content-between align-items-center">
            <a class="btn btn-outline-secondary" href="/refugios">← Volver a Refugios</a>
            <span class="badge bg-primary fs-6">${mascotas.length} ${mascotas.length === 1 ? 'mascota encontrada' : 'mascotas encontradas'}</span>
        </div>`

        if (mascotas.length === 0) {
            html += `
            <div class="alert alert-info text-center p-4">
                <h5>Este refugio aún no tiene mascotas asignadas</h5>
                <p class="mb-0 text-muted">Pronto sumarán nuevos integrantes en adopción.</p>
            </div>`
        } else {
            html += `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">`
            mascotas.forEach(pet => {
                const imgUrl = pet.img || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
                const tamano = pet.size || pet.tamaño
                
                html += `
                <div class="col">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${imgUrl}" class="card-img-top" alt="${pet.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title fw-bold mb-0">${pet.name}</h5>
                                <span class="badge bg-info text-dark text-capitalize">${pet.section || 'General'}</span>
                            </div>
                            <p class="card-text text-muted small flex-grow-1">${pet.description || 'Sin descripción disponible.'}</p>
                            <div class="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                                <span class="badge bg-light text-secondary border">Tamaño: ${tamano}</span>
                                <a href="/mascotas/${pet._id}" class="btn btn-sm btn-primary">Ver detalle</a>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            html += `</div>`
        }

        res.send(createPage("Mascotas del Refugio", html))
    } catch (error) {
        res.send(petsView.pageError(500, "Error al cargar las mascotas del refugio"))
    }
}