const express = require('express');
const { db_con } = require('../sumakina/config.db');
const User = require('../models/users')
const bcry =require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { esRolValido, CorreoExiste, IDexist } = require('../helpers/db-validator');
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
        this.app.get('/api', async (req, res) => {
            //localhost:8081/api/limite=2
            const {limite=2,range}=req.query
            const resp= await Promise.all([
                User.find({estado:true}).limit(Number(limite)).skip(Number(range)),
                User.countDocuments({estado:true})
            ])
            //const usersget= await User.find({estado:true}).limit(Number(limite)).skip(Number(range))
            //const total =await User.countDocuments({estado:true})
            res.json({
                msj: "Hello get",
                resp
            })
          })

        this.app.post('/api', [
            check('correo', 'sumakina correo no valido').custom(CorreoExiste),
            check('contraseña', 'la contraseña debe se mas elavorada, ponle alma hombre!').isLength({min:6}),
            check('nombre','pero dime tu nombre we, no sea timido').not().isEmpty(),
            check('rol').custom(esRolValido)
        ], async(req, res) => {
            const errors=validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors)
            }
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

          this.app.put('/api/:id',[
            check('id').custom(IDexist)
          ], async (req, res) => {
            const errors=validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors)
            }
            const id=req.params
            const {contraseña, google, correo, ...resto}=req.body
            if (contraseña) {
                const salt=bcry.genSaltSync()
                resto.contraseña=bcry.hashSync(contraseña,salt)
            }

            const us=await User.findOneAndUpdate(id,resto,{new:true})
            res.json({
                msj: "Hello put",
                id,
                us
            })
        })

        this.app.delete('/api',async (req, res) => {
            const userdel=await User.findByIdAndDelete()
            res.json({
                msj: "Hello delete"
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