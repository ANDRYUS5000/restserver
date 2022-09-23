const mongoose = require("mongoose")

const db_con=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CON, {
            
        })
        console.log("ESTA VIVAAAAAAAAA!!!!!!!!!")
    } catch (error) {
        console.log("sumakina da error nmm: ",error)
        throw new Error("sumakina da error nmm")
    }
}

module.exports={
    db_con
}