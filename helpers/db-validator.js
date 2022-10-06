const roles = require('../models/role')
const users = require('../models/users')
const { ObjectId } = require('mongodb');
const { isValidObjectId } = require('mongoose');
const { castObject } = require('../models/users');


const esRolValido=async(rol='')=>{
    const existeRol= await roles.findOne({rol})
    if(!existeRol){
        throw new Error(`wey ${rol} no exite`)
    }
}

const CorreoExiste=async(correo='')=>{
    const ecor= await users.findOne({correo})
    if(ecor){
        throw new Error(`El delito de suplantacion de identidad es una pena grave: ${correo} `)
    }
}

const IDexist=async(id)=>{
    const eid= await users.findById(id)
    if(!eid){
        throw new Error(`esa chingadera no la quiero: ${id} `)
    }
}

module.exports={esRolValido, CorreoExiste, IDexist}