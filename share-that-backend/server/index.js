const express = require('express')
const routes = require('./api')
const app = express()
const port = 5000
const helmet = require("helmet");

require('@db')

//middleware 
app.use(express.json())
app.use(helmet());

app.use('/api/v1', routes)
app.get('/', (req, res) => { res.send('Hello World!') })
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) })