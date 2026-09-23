
import { createPage, createList } from "../page/utils.js"

export function createPetsPage(mascotas) {
    return createPage("Mascotas", createList(mascotas))
}

export function createDetailPage(mascota) {
    let html = `<p>Descripción: ${mascota.description}</p>`
    html += `<p>Especie / Sección: ${mascota.section}</p>`
    html += `<p>Tamaño: ${mascota.size}</p>`
    html += `<p>Estado: ${mascota.status || "disponible"}</p>`
    html += `<p>Enlace de adopción: <a href="${mascota.link}" target="_blank">${mascota.link}</a></p>`
    if (mascota.img) {
        html += `<div class="my-3"><img src="${mascota.img}" alt="${mascota.name}" style="max-width: 300px; border-radius: 8px;" /></div>`
    }
    html += "<a href='/mascotas'>Volver</a>"
    return createPage(mascota.name, html)
}

export function pageError(error, mensaje) {
    return createPage(error, mensaje)
}

export function nuevaPetForm() {
    let html = `<form action="/mascotas/nuevo" method="POST">`
    html += `
        <div class="mt-2">
            <label class="form-label">Nombre: </label>
            <input class="form-control" type="text" name="name" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Descripción: </label>
            <textarea class="form-control" name="description" required></textarea>
        </div>
        <div class="mt-2">
            <label class="form-label">Sección / Especie (ej: perros, gatos): </label>
            <input class="form-control" type="text" name="section" required />
        </div>   
        <div class="mt-2">
            <label class="form-label">Tamaño (ej: chico, mediano, grande): </label>
            <input class="form-control" type="text" name="size" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Estado: </label>
            <input class="form-control" type="text" name="status" value="disponible" />
        </div>
        <div class="mt-2">
            <label class="form-label">Link de adopción: </label>
            <input class="form-control" type="url" name="link" required />
        </div>      
        <div class="mt-2">
            <label class="form-label">URL de Imagen: </label>
            <input class="form-control" type="url" name="img" />
        </div>      
        <button class="btn btn-primary mt-3" type="submit">Guardar</button>                 
    `
    html += `</form>`
    html += "<div class='mt-4'><a href='/mascotas'>Volver</a></div>"
    return createPage("Nueva Mascota", html)
}

export function editarPetForm(mascota) {
    let html = `<form action="/mascotas/editar/${mascota._id}" method="POST">`
    html += `
        <div class="mt-2">
            <label class="form-label">Nombre: </label>
            <input class="form-control" type="text" name="name" value="${mascota.name || ''}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Descripción: </label>
            <textarea class="form-control" name="description" required>${mascota.description || ''}</textarea>
        </div>
        <div class="mt-2">
            <label class="form-label">Sección / Especie: </label>
            <input class="form-control" type="text" name="section" value="${mascota.section || ''}" required />
        </div>   
        <div class="mt-2">
            <label class="form-label">Tamaño: </label>
            <input class="form-control" type="text" name="size" value="${mascota.size || ''}" required />
        </div>
        <div class="mt-2">
            <label class="form-label">Estado: </label>
            <input class="form-control" type="text" name="status" value="${mascota.status || 'disponible'}" />
        </div>
        <div class="mt-2">
            <label class="form-label">Link de adopción: </label>
            <input class="form-control" type="url" name="link" value="${mascota.link || ''}" required />
        </div>      
        <div class="mt-2">
            <label class="form-label">URL de Imagen: </label>
            <input class="form-control" type="url" name="img" value="${mascota.img || ''}" />
        </div>      
        <button class="btn btn-primary mt-3" type="submit">Guardar Cambios</button>                 
    `
    html += `</form>`
    html += "<div class='mt-4'><a href='/mascotas'>Volver</a></div>"
    return createPage(`Editar Mascota: ${mascota.name}`, html)
}

export function eliminarPetForm(mascota) {
    let html = ``
    html += `<form action="/mascotas/eliminar/${mascota._id}" method="POST">`
    html += `<p>¿Está seguro de que desea eliminar a <strong>${mascota.name}</strong>?</p>`
    html += `<p>Descripción: ${mascota.description}</p>`
    html += `<p>Especie / Sección: ${mascota.section}</p>`
    html += `<p>Tamaño: ${mascota.size}</p>`
    html += `<button class="btn btn-danger mt-2">Eliminar</button>`
    html += `</form>`
    html += "<div class='mt-3'><a href='/mascotas'>Volver</a></div>"
    return createPage(`Eliminar ${mascota.name}`, html)
}