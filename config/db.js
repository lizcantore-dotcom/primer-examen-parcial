/*import { MongoClient } from "mongodb"

export function db() {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:3333"
    const client = new MongoClient(MONGO_URI)
    const db = client.db("dwm4av")
    return db
}

export function client(){
    const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:3333"
    const client = new MongoClient(MONGO_URI)
    return client
}*/
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin123@ac-rpnvems-shard-00-00.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-01.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-02.kfc0pyq.mongodb.net:27017/AH20232CP1?replicaSet=atlas-w8yx2g-shard-0&ssl=true&authSource=admin"

const clientInstance = new MongoClient(MONGO_URI)

export function db() {
    return clientInstance.db("AH20232CP1")
}

export function client() {
    return clientInstance
}

export default clientInstance