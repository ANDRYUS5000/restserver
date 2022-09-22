const express = require('express')
//const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
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

        this.app.post('/api', (req, res) => {
            const body=req.body
            res.json({
                msj: "Hello post",
                body
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
            console.log('Hello word')
        })
    }

}

module.exports = Server;