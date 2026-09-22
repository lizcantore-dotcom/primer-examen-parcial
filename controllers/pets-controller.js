export async function getPets(req, res) {
    res.send("<h1>Vista de Mascotas (Catálogo y Menú de Secciones)</h1>")
}

export async function getPetById(req, res) {
    res.send(`<h1>Detalle de Mascota ID: ${req.params.id}</h1>`)
}

export async function nuevaPetForm(req, res) {
    res.send("<h1>Formulario para cargar nueva mascota</h1>")
}

export async function guardarPet(req, res) {
    res.redirect("/mascotas")
}

export async function editarPetForm(req, res) {
    res.send(`<h1>Formulario de edición para la mascota ${req.params.id}</h1>`)
}

export async function editarPet(req, res) {
    res.redirect("/mascotas")
}

export async function eliminarPetForm(req, res) {
    res.send(`<h1>Confirmación de eliminación de la mascota ${req.params.id}</h1>`)
}

export async function eliminarPet(req, res) {
    res.redirect("/mascotas")
}