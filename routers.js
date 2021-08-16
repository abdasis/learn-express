const express = require('express');
const routers = express.Router();
const client = require('./connection');
const objectId = require('mongodb').ObjectId;

routers.get('/', (req, res) => res.send('Hello World'));
routers.get('/post/:id?', (req, res) => {
    if(req.params.id) res.send('Artikel-'+req.paramsid)
})

routers.get('/karyawan/semua', async (req, res) => {
    if (client.connect()){
        const db = client.db('latihan')
        const semua_karyawan = await db.collection('karyawan').find().toArray();
        res.send({
            status: 'success',
            message: 'data karyawan',
            data: semua_karyawan
        })
    }else{
        res.send('koneksi database gagal');
    }
})

routers.get('/karyawan/:id', async (req, res) => {
    if (client.connect())
    {
        const db = client.db('latihan');
        const karyawan = await db.collection('karyawan').findOne({
            _id: objectId(req.params.id)
        });

        res.send({
            status: 'success',
            message: 'detail karyawan',
            data: karyawan
        })
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

routers.post('/karyawan', async (req, res) => {
    if (client.connect())
    {
        const {nama, nik, alamat} = req.body;
        const db = client.db('latihan');

        const result = await db.collection('karyawan').insertOne({
            nama: nama,
            nik: nik,
            alamat: alamat,
        })
        if (result){
            res.send({
                status: 'success',
                message: 'Data karyawan berhasil ditambah',
            })
        }else {
            res.send({
                status: 'error',
                message: 'Gagal menambahkan data karyawan'
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'Koneksi database gagal'
        })
    }
})

routers.delete('/karyawan/:id', async (req, res) => {
    if (client.connect())
    {
        const db = client.db('latihan');
        const result = await db.collection('karyawan').deleteOne({
            _id: objectId(req.params.id)
        })
        if (result.deletedCount==1){
            res.send({
                status: 'success',
                message: 'Data berhasil dihapus'
            })
        }else{
            res.send({
                status: 'error',
                message: 'Karyawan gagal dihapus'
            })
        }
    }else{
        res.send({
            ststus: 'error',
            message: 'Koneksi database gagal'
        })
    }
})
module.exports = routers;