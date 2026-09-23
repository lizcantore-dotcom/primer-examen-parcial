/*import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"
import * as reviewService from "./reviews.service.js"

export async function getPets(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }     // != true https://www.mongodb.com/es/docs/manual/reference/operator/query/ne/
    // Calculo de paginas
    const page = parseInt(filtros?.page ?? 1)
    const limit = parseInt(filtros?.limit ?? 10)
    const skip = (page - 1) * limit

    // Filtro por idioma
    if (filtros?.tamaño) filter.tamaño = filtros?.tamaño

   
    // Busqueda por titulo
    if (filtros?.title) filter.title = { $regex: filtros?.title, $options: "i" }   //https://www.mongodb.com/es/docs/manual/reference/operator/query/regex/
    //if( filtros?.title ) filter.$text = { $search: filtros?.title } //Necesitan un indice //https://www.mongodb.com/es/docs/manual/reference/operator/query/text/

    const pets = await db.collection("mascotas").find(filter).skip(skip).limit(limit).toArray()
    return pets
}

export async function getPetsByTitle(id) {
    const db = conexion()
    const pets = await db.collection("mascotas").findOne({ _id: new ObjectId(id) })
    return pets
}

export async function guardarPets(pets) {
    const db = conexion()
    await db.collection("mascotas").insertOne(pets)
    return pets
}

export async function editarPets(id, pets) {
    const db = conexion()
    await db.collection("mascotas").replaceOne({ _id: new ObjectId(id) }, pets)
    return pets
}

export async function eliminarPetsFisico(id) {
    const db = conexion()
    let pets = await getPetsByTitle(id)
    await db.collection("mascotas").deleteOne({ _id: new ObjectId(id) })
    return pets
}

export async function eliminarPetsLogico(id) {
    const db = conexion()
    let pets = await getPetsByTitle(id)
    await db.collection("mascotas").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } } //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
    )
    return pets
}

export async function petsExists(id){
    const db = conexion()
    console.log("id mascota",id)
    const count = await db.collection("mascotas").countDocuments({_id:  new ObjectId(id)})
    return count > 0
}

export async function savePetsReview(id, usuario){
    // _id
    // nombre/email
    // comentario
    const pets = await getPetsByTitle(id)
    const petsReview = await reviewService.saveReview(usuario, pets)
    return petsReview
*/
import { ObjectId } from "mongodb"
import { db as conexion } from "../config/db.js"
import * as reviewService from "./reviews.service.js"

export async function getPets(filtros = {}) {
    const db = conexion()
    const filter = { eliminado: { $ne: true } }

    const page = parseInt(filtros?.page ?? 1)
    const limit = parseInt(filtros?.limit ?? 10)
    const skip = (page - 1) * limit

    if (filtros?.section) filter.section = filtros.section
    if (filtros?.tamaño) filter.tamaño = filtros.tamaño
    if (filtros?.size) filter.size = filtros.size

    if (filtros?.name) filter.name = { $regex: filtros.name, $options: "i" }
    if (filtros?.title) filter.title = { $regex: filtros.title, $options: "i" }

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
    await db.collection("pets").insertOne(pets)
    return pets
}

export async function editarPets(id, pets) {
    const db = conexion()
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
        { $set: { eliminado: true } }
    )
    return pets
}

export async function petsExists(id){
    const db = conexion()
    const count = await db.collection("pets").countDocuments({ _id: new ObjectId(id) })
    return count > 0
}

export async function savePetsReview(id, usuario){
    const pets = await getPetsByTitle(id)
    const petsReview = await reviewService.saveReview(usuario, pets)
    return petsReview
}