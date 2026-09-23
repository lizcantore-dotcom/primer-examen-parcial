
import { ObjectId } from "mongodb"
import { db as conexion, client } from "../config/db.js"
import * as shelterService from "../services/shelters.service.js"
import * as userService from "./shelters.service.js"
import { MongoClient } from "mongodb"

export async function saveReview(usuario, pets) {

    const db = conexion()

    if (!(await petsService.petsExists(pets._id) && await userService.userExists(usuario._id))) {
        throw new Error("Exploto")
    }
    usuario._idReview = new ObjectId()
    await db.collection("mascotas").updateOne(
        { _id: new ObjectId(pets._id) },
        { $push: { reviews: { ...usuario } } }
    )

    usuario.pets = { ...pets, reviews: undefined }
    await db.collection("usuarios").updateOne(
        { _id: new ObjectId(usuario._id) },
        { $push: { reviews: { ...usuario, _id: undefined } } }
    )
    return pets
}

export async function deleteReview(id) { 
    const mongoClient = client()

    const session = mongoClient.startSession()
    try {

        session.startTransaction()

        const db = mongoClient.db("primerParcial")
        const resUsuario = await db.collection("usuarios").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        const resPets = await db.collection("mascotas").updateOne(
            { "reviews._idReview": new ObjectId(id) },
            { $pull: { reviews: { _idReview: new ObjectId(id) } } },
            { session }
        )
        if (resUsuario.modifiedCount == 0 || resPets.modifiedCount == 0) {
            throw new Error("NO se modifico uno")
        }
        await session.commitTransaction()
        return true
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        return false
    } finally {
        await session.endSession()
    }
}