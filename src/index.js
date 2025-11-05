const express = require('express')
const app = express()
const { PORT } = require('./config/serverConfig')
const bodyParser = require('body-parser')

const PrepareAndStartServe = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({alter : true}))


    app.listen(PORT,() => {
        console.log(`SERVER STARTED AT PORT ${PORT}`);
    })
}

PrepareAndStartServe()