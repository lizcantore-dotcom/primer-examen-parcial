import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"

// Obtener todos los refugios

export async function getShelters() {
    const db = conexion()
    return await db.collection("shelters").find().toArray()
}

// Crear un refugio con Nombre, Foto y Descripción

export async function createShelter(shelter) {
    const db = conexion()
    const nuevo = {
        name: shelter.name,
        photo: shelter.photo || "https://picsum.photos/400/225",
        description: shelter.description
    }
    const result = await db.collection("shelters").insertOne(nuevo)
    return { _id: result.insertedId, ...nuevo }
}

// Obtener todas las mascotas de un refugio específico

export async function getPetsByShelterId(shelterId) {
    const db = conexion()
    return await db.collection("pets").find({
        shelter_id: new ObjectId(shelterId),
        eliminado: { $ne: true }
    }).toArray()
}