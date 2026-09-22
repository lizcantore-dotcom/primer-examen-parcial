export async function getPets(req, res) {
    res.status(200).json({ message: "Listado de mascotas disponible" })
}

export async function getPetById(req, res) {
    res.status(200).json({ message: `Detalle de la mascota ${req.params.id}` })
}

export async function savePet(req, res) {
    res.status(201).json({ message: "Mascota guardada con éxito", data: req.body })
}

export async function replacePet(req, res) {
    res.status(200).json({ message: `Mascota ${req.params.id} reemplazada (PUT)` })
}

export async function updatePet(req, res) {
    res.status(200).json({ message: `Mascota ${req.params.id} actualizada (PATCH)` })
}

export async function deletePet(req, res) {
    res.status(200).json({ message: `Mascota ${req.params.id} eliminada` })
}