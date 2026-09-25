    import { createPage, createList } from "../page/utils.js"

    export function createPetsPage(mascotas) {
        return createPage("Mascotas", createList(mascotas))
    }

    export function createDetailPage(mascota) {
        let html = `<p>Descripcion: ${mascota.description}</p>`
        html += `<p>Seccion: ${mascota.section}</p>`
        html += `<p>Tamaño: ${mascota.size}</p>`
        html += `<p>Estado: ${mascota.status}</p>`
        html += `<p>Link: ${mascota.link}</p>`
        html += `<div class="my-3"><img src="${mascota.img}" alt="${mascota.name}" class="pet-detail-img" /></div>`
        html += "<a href='/mascotas' >Volver</a>"
        return createPage(mascota.name, html)
    }

    export function pageError(error, mensaje) {
        return createPage(error, mensaje)
    }

    export function nuevaPetForm(refugios = []) {
        let options = refugios.map(r => `<option value="${r._id}">${r.name}</option>`).join("")

        let html = `<form action="/mascotas/nuevo" method="POST" >`
        html += `
            <div class="mt-2">
                <label class="form-label">Refugio asignado: </label>
                <select class="form-select" name="shelter_id" required>
                    <option value="" disabled selected>Selecciona un refugio...</option>
                    ${options}
                </select>
            </div>
            <div class="mt-2">
                <label class="form-label">Nombre: </label>
                <input class="form-control" type="text" name="name" required />
            </div>
            <div class="mt-2">
                <label class="form-label">Descripcion: </label>
                <input class="form-control" type="text" name="description" />
            </div>
            <div class="mt-2">
                <label class="form-label">Seccion: </label>
                <input class="form-control" type="text" name="section" />
            </div>   
            <div class="mt-2">
                <label class="form-label">Tamaño: </label>
                <input class="form-control" type="text" name="size" />
            </div>
            <div class="mt-2">
                <label class="form-label">Estado: </label>
                <input class="form-control" type="text" name="status" value="disponible" />
            </div>
            <div class="mt-2">
                <label class="form-label">Link: </label>
                <input class="form-control" type="text" name="link" />
            </div>      
            <div class="mt-2">
                <label class="form-label">Imagen: </label>
                <input class="form-control" type="text" name="img" />
            </div>      
            <button class="btn btn-primary mt-3" type="submit">Guardar</button>                 
        `
        html += `</form>`
        html += "<a href='/mascotas' class='mt-4 d-inline-block'>Volver</a>"
        return createPage("Nueva Mascota", html)
    }

    export function editarPetForm(mascota, refugios = []) {
        let options = `<option value="">Sin refugio asignado</option>`
        
        refugios.forEach(refugio => {
            const isSelected = mascota.shelter_id && mascota.shelter_id.toString() === refugio._id.toString() ? "selected" : ""
            options += `<option value="${refugio._id}" ${isSelected}>${refugio.name}</option>`
        })

        let html = `<form action="/mascotas/editar/${mascota._id}" method="POST" >`
        html += `
            <div class="mt-2">
                <label class="form-label">Refugio asignado: </label>
                <select class="form-select" name="shelter_id">
                    ${options}
                </select>
            </div>
            <div class="mt-2">
                <label class="form-label">Nombre: </label>
                <input class="form-control" type="text" name="name" value="${mascota.name}" />
            </div>
            <div class="mt-2">
                <label class="form-label">Descripcion: </label>
                <input class="form-control" type="text" name="description" value="${mascota.description}" />
            </div>
            <div class="mt-2">
                <label class="form-label">Seccion: </label>
                <input class="form-control" type="text" name="section" value="${mascota.section}" />
            </div>   
            <div class="mt-2">
                <label class="form-label">Tamaño: </label>
                <input class="form-control" type="text" name="size" value="${mascota.size || mascota.tamaño}" />
            </div>
            <div class="mt-2">
                <label class="form-label">Estado: </label>
                <input class="form-control" type="text" name="status" value="${mascota.status}" />
            </div>
            <div class="mt-2">
                <label class="form-label">Link: </label>
                <input class="form-control" type="text" name="link" value="${mascota.link}" />
            </div>      
            <div class="mt-2">
                <label class="form-label">Imagen: </label>
                <input class="form-control" type="text" name="img" value="${mascota.img}" />
            </div>      
            <button class="btn btn-primary mt-3" type="submit">Guardar</button>                 
        `
        html += `</form>`
        html += "<a href='/mascotas' class='mt-4 d-inline-block'>Volver</a>"
        return createPage("Editar Mascota", html)
    }

    export function eliminarPetForm(mascota) {
        let html = ``
        html += `<form action="/mascotas/eliminar/${mascota._id}" method="POST" >`
        html += `<p>Nombre: ${mascota.name}</p>`
        html += `<p>Descripcion: ${mascota.description}</p>`
        html += `<p>Seccion: ${mascota.section}</p>`
        html += `<p>Tamaño: ${mascota.size || mascota.tamaño || "-"}</p>`
        html += `<button class="btn btn-danger" >Eliminar</button>`
        html += `</form>`
        html += "<a href='/mascotas' >Volver</a>"
        return createPage(mascota.name, html)
    }