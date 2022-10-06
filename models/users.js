const { Schema, model} = require("mongoose");


const usuarioQuemas = Schema({
    nombre: {
        type: String,
        required:[true,"pero hombre, pnomele cabeza, Como vrg te llamas??!!!"]
    },
    correo:{
        type: String,
        required:[true,"y si te quiero contactar? te hablo por humo o que vrg"],
        unique:true
    },
    contraseña:{
        type: String,
        required:[true,"Se llama seguridad weon, ahora ponte vrg y crea una pass"]
    },
    estado:{
        type: Boolean,
        default:true,
    },
    rol:{
        type: String,
        required:[true,"y que haces o que?"],
        enum:['ADMIN','USER','VENTAS']
    },
    google:{
        type: Boolean,
        default:false,
    },
})

module.exports=model('Usuario',usuarioQuemas)