const express = require('express');
const { db_con } = require('../sumakina/config.db');
const User = require('../models/users')
const bcry =require('bcryptjs')
//const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.conDB()
        this.middle()
        this.routes()
    }

    routes(){
        this.app.get('/api', (req, res) => {
            const qry=req.query
            res.json({
                msj: "Hello get",
                qry
            })
          })

        this.app.post('/api', async(req, res) => {
            const {nombre,correo,contraseña,rol}=req.body
            const user=new User({nombre,correo,contraseña,rol})
            const existecorreo= await User.findOne({correo})
            if (existecorreo) {
                return res.status(400).json({
                    "msj": "El delito de suplantacion de identidad es una pena grave"
                })
            }
            const salt=bcry.genSaltSync()
            user.contraseña=bcry.hashSync(contraseña,salt)
            await user.save()
            res.json({
                msj: "Hello post",
                user
            })
          })

          this.app.put('/api/:id', (req, res) => {
            const id=req.params
            res.json({
                msj: "Hello put",
                id
            })
        })
    }

    middle(){
        this.app.use(express.static('public'))
        this.app.use(express.json())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('sus chinanigunz seran aportados atraves del puertito: ', this.port)
        })
    }

    async conDB(){
        await db_con()
    }
}

module.exports = Server;