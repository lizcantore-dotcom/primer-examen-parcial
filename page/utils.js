/*export function createPage(title, content) {
    let html = ""
    html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head><body>`
    html += `<div class="container-fluid" ><h1>${title}</h1>`
    html += content
    html += `</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body></html>`
    return html
}

export function createList(lista) {
    let html = `
    <a class="btn btn-primary" href="/peliculas/nuevo" >Nueva Pelicula</a>
    <a class="btn btn-secondary" href="/peliculas?language=Japanese" >Japones</a>
    <a class="btn btn-secondary" href="/peliculas?language=Spanish" >Español</a>
    <a class="btn btn-secondary" href="/peliculas?language=English" >Ingles</a>
    <a class="btn btn-secondary" href="/peliculas?language=Korean" >Coreano</a>
    <table class="table table-striped" >
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Idioma</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>`
    lista.forEach(pelicula =>
        html += `
        <tr>
            <td>${pelicula.title}</td>
            <td>${pelicula.language}</td>
            <td>
                <a class="btn btn-primary" href="/peliculas/${pelicula._id}" >Ver</a>
                <a class="btn btn-warning" href="/peliculas/editar/${pelicula._id}" >Editar</a>
                <a class="btn btn-danger" href="/peliculas/eliminar/${pelicula._id}" >Borrar</a>
            </td>
        </tr>
        `
    )
    html += `</tbody></table>`
    return html
}

export function createListPersonajes(lista) {
    let html = "<ul>"
    lista.forEach(item => html += "<li>Nombre: " + item.name + " Casa: " + item.house + "</li>")
    html += "</ul>"
    return html
}

export default { createPage, createList }*/
export function createPage(title, content) {
    let html = ""
    html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
    html += `<title>${title}</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head><body>`
    html += `<div class="container-fluid py-3" ><h1>${title}</h1>`
    html += content
    html += `</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script></body></html>`
    return html
}

export function createList(lista) {
    let html = `
    <div class="mb-3 d-flex gap-2 flex-wrap">
        <a class="btn btn-primary" href="/mascotas/nuevo">Nueva Mascota</a>
        <a class="btn btn-outline-secondary" href="/mascotas">Todos</a>
        <a href="/refugios" class="btn btn-outline-secondary">Ver Refugios</a>
        <a class="btn btn-secondary" href="/mascotas?section=perros">Perros</a>
        <a class="btn btn-secondary" href="/mascotas?section=gatos">Gatos</a>
        <a class="btn btn-secondary" href="/mascotas?section=aves">Aves</a>
        <a class="btn btn-secondary" href="/mascotas?section=conejos">Conejos</a>
        <a class="btn btn-secondary" href="/mascotas?section=otros">Otros</a>
        <a href="/" class="btn btn-outline-secondary me-2">← Volver al Inicio</a>
    </div>
    <table class="table table-striped" >
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
            <td>${pet.name || pet.title || "-"}</td>
            <td>${pet.section || "-"}</td>
            <td>${pet.size || pet.tamaño || "-"}</td>
            <td><img src="${pet.img || 'https://picsum.photos/100/60'}" width="70" style="border-radius:4px;" /></td>
            <td><a href="${pet.link || '#'}" target="_blank">Ficha</a></td>
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

export function createListPersonajes(lista) {
    let html = "<ul>"
    lista.forEach(item => html += "<li>Nombre: " + item.name + " Casa: " + item.house + "</li>")
    html += "</ul>"
    return html
}

export default { createPage, createList, createListPersonajes }