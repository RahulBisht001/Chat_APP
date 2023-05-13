const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const User = require('./models/user')

//! _________________ Socket.io _________________
const { Server } = require('socket.io')


const DBConnection = require('./DB_Connection')

process.on("uncaughtException", (err) => {
    console.log(err)
    console.log("UNCAUGHT Exception! Shutting down ...")
    process.exit(1)
    //^ Exit Code 1 indicates that a container shut down, either because of an application failure.
});


const PORT = process.env.PORT || 5000
const app = require("./app")


const http = require("http")
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})


// DataBase Connection
DBConnection()


server.listen(PORT, () => {
    console.log(`Server Listening at PORT http://localhost:${PORT}`)
});


io.on('connection', async (socket) => {

    console.log("socket")
    console.log(socket)
    console.log(socket.handshake.query['user_id'])


    const user_id = socket.handshake.query['user_id']
    const socket_id = socket.id

    console.log(`User Connected with this socket_id ${socket_id}`)

    if (user_id) {
        await User.findByIdAndUpdate(user_id, { socket_id, })
    }

    //^ We can write our own socket event listners here

    socket.on('friend_request', async (data) => {
        console.log("Data")
        console.log(data)
        console.log(data.to)

        const to = await User.findById(data.to)

        //Todo => Create a Friend Request

        io.to(to.socket_id).emit('new_friend_request', {

        })
    })
})


process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("UNHANDLED REJECTION! Shutting down ...")
    server.close(() => {
        process.exit(1)
        //^  Exit Code 1 indicates that a container shut down, either because of an application failure.
    });
});