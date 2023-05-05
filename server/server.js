const express = require('express')
const morgan = require('morgan') //? http request logger middleware for node.js
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors') //? Cross origin Resources sharing

//! Security Purpose
const rateLimit = require('express-rate-limit') //? access  request attack
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss') //? Cross site scripting attack


const app = express()

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT || 5000

//?   Middlewares
app.use(express.json({ limit: '100kb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3000,
    message: 'Too many requests from this IP .Please try again in an hour'
})

app.use('/hike', limiter)

app.use(express.urlencoded({
    extended: true,
}))

app.use(mongoSanitize())
app.use(xss)

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
    credentials: true
}))




app.get('/', (req, res) => {
    res.send('Hi')
})

app.listen(PORT, () => {
    console.log(`server is running pn http://localhost:${PORT}`)
})