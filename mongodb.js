const MongoClient = require('mongodb').MongoClient;
const connectionString = "mongodb://localhost:27017";

(async () => {
    try {
        const client = await MongoClient.connect(connectionString, {
            useUnifiedTopology: true
        })

        const db = client.db('latihan')

        const karyawan = await db.collection('karyawan').find().toArray()
        console.log(karyawan);
    } catch (error) {
        console.error(error);
    }
})();(error => console.log(error))