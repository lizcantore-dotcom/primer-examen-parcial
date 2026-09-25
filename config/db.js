
import { MongoClient } from "mongodb"

export function db() {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin123@ac-rpnvems-shard-00-00.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-01.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-02.kfc0pyq.mongodb.net:27017/AH20232CP1?replicaSet=atlas-w8yx2g-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(MONGO_URI)
    const db = client.db("AH20232CP1")
    return db
}

export function client() {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:admin123@ac-rpnvems-shard-00-00.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-01.kfc0pyq.mongodb.net:27017,ac-rpnvems-shard-00-02.kfc0pyq.mongodb.net:27017/AH20232CP1?replicaSet=atlas-w8yx2g-shard-0&ssl=true&authSource=admin"
    const client = new MongoClient(MONGO_URI)
    return client
}