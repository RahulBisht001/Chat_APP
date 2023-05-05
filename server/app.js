const express = require('express')
const morgan = require('morgan')
const app = express()

const PORT = 8000
app.get('/', (req, res) => {
    res.send('Hi')
})

app.listen(PORT, () => {
    console.log(`server is running pn http://localhost:${PORT}`)
})