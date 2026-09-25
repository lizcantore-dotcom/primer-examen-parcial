import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"

    // Servicios de Mascotas
export async function getPets(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }     // != true https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/

    // Calculo de paginas
    const page = parseInt(filtros?.page ?? 1)
    const limit = parseInt(filtros?.limit ?? 10)
    const skip = (page - 1) * limit

    // Filtros
    if (filtros?.section) filter.section = filtros.section
    if (filtros?.size) filter.size = filtros.size

    // Busqueda por nombre
    if (filtros?.name) filter.name = { $regex: filtros.name, $options: "i" }   //https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/

    const pets = await db.collection("pets").find(filter).skip(skip).limit(limit).toArray()
    return pets
}

export async function getPetsByTitle(id) {
    const db = conexion()
    const pets = await db.collection("pets").findOne({ _id: new ObjectId(id) })
    return pets
}

export async function guardarPets(pets) {
    const db = conexion()
    if (pets.shelter_id) {
        pets.shelter_id = new ObjectId(pets.shelter_id)
    }
    await db.collection("pets").insertOne(pets)
    return pets
}

export async function editarPets(id, pets) {
    const db = conexion()
    if (pets.shelter_id) {
        pets.shelter_id = new ObjectId(pets.shelter_id)
    }
    await db.collection("pets").replaceOne({ _id: new ObjectId(id) }, pets)
    return pets
}

export async function eliminarPetsFisico(id) {
    const db = conexion()
    let pets = await getPetsByTitle(id)
    await db.collection("pets").deleteOne({ _id: new ObjectId(id) })
    return pets
}

export async function eliminarPetsLogico(id) {
    const db = conexion()
    let pets = await getPetsByTitle(id)
    await db.collection("pets").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return pets
}

export async function petsExists(id) {
    const db = conexion()
    console.log("id mascota", id)
    const count = await db.collection("pets").countDocuments({ _id: new ObjectId(id) })
    return count > 0
}

    // Servicios de Refugios

export async function getShelters(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }

    if (filtros?.name) {
        filter.name = { $regex: filtros.name, $options: "i" }
    }

    const shelters = await db.collection("shelters").find(filter).toArray()
    return shelters
}

export async function getShelterById(id) {
    const db = conexion()
    const shelter = await db.collection("shelters").findOne({ _id: new ObjectId(id) })
    return shelter
}

export async function createShelter(shelter) {
    const db = conexion()
    const nuevo = {
        name: shelter.name,
        photo: shelter.photo,
        description: shelter.description
    }
    const result = await db.collection("shelters").insertOne(nuevo)
    return { _id: result.insertedId, ...nuevo }
}

export async function shelterExists(id) {
    const db = conexion()
    const count = await db.collection("shelters").countDocuments({ _id: new ObjectId(id) })
    return count > 0
}

export async function getPetsByShelterId(shelterId) {
    const db = conexion()
    const pets = await db.collection("pets").find({
        shelter_id: new ObjectId(shelterId),
        eliminado: { $ne: true }
    }).toArray()
    return pets
}
