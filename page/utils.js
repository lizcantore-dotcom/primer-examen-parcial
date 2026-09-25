export function createPage(title, content) {
    let html = ""
    html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">`
    html += `<link rel="stylesheet" href="/style.css">`
    html += `</head><body>`
    html += `<div class="container-fluid py-3"><h1>${title}</h1>`
    html += content
    html += `</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body></html>`
    return html
}

export function createList(lista) {
    let html = `
    <div class="mb-3 d-flex gap-2 flex-wrap">
        <a class="btn btn-primary" href="/mascotas/nuevo">Nueva Mascota</a>
        <a class="btn btn-outline-secondary" href="/mascotas">Todos</a>
        <a class="btn btn-secondary" href="/mascotas?section=perros">Perros</a>
        <a class="btn btn-secondary" href="/mascotas?section=gatos">Gatos</a>
        <a class="btn btn-secondary" href="/mascotas?section=aves">Aves</a>
        <a class="btn btn-secondary" href="/mascotas?section=conejos">Conejos</a>
        <a class="btn btn-secondary" href="/mascotas?section=otros">Otros</a>
        <a class="btn btn-info text-white" href="/refugios">Ver Refugios</a>
        <a class="btn btn-outline-secondary" href="/">Volver al Inicio</a>
    </div>
    <table class="table table-striped align-middle">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Sección</th>
                <th>Tamaño</th>
                <th>Imagen</th>
                <th>Enlace</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>`
    lista.forEach(pet =>
        html += `
        <tr>
            <td>${pet.name}</td>
            <td>${pet.section}</td>
            <td>${pet.size || pet.tamaño}</td>
            <td><img src="${pet.img}" width="70" class="rounded object-fit-cover" alt="${pet.name}" /></td>
            <td>
                ${pet.shelter_id 
                ? `<a href="/refugios/${pet.shelter_id}/mascotas" class="btn btn-sm btn-outline-info">Ver Refugio</a>` 
                : `<span class="text-muted small">Sin asignar</span>`}
            </td>
            <td>
                <a class="btn btn-primary btn-sm" href="/mascotas/${pet._id}">Ver</a>
                <a class="btn btn-warning btn-sm" href="/mascotas/editar/${pet._id}">Editar</a>
                <a class="btn btn-danger btn-sm" href="/mascotas/eliminar/${pet._id}">Borrar</a>
            </td>
        </tr>
        `
    )
    html += `</tbody></table>`
    return html
}

export default { createPage, createList }