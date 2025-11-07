const express = require('express')
const app = express()
const { PORT } = require('./config/serverConfig')
const bodyParser = require('body-parser')
const db = require('./models/index')
const apiroutes = require('./routes/index')

const PrepareAndStartServe = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({alter : true}))
    app.use('/api',apiroutes)

    app.listen(PORT,() => {
        console.log(`SERVER STARTED AT PORT ${PORT}`);
        if(process.env.SYNC_DB === 'true'){
            db.sequelize.sync({alter : true})
        }
    })
}

PrepareAndStartServe()