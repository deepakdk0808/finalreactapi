const express = require('express')

const connect = require("./configs/db")
const teacherController = require("./controllers/teacher.controller")
const classController = require('./controllers/class.controller')
const cors=require("cors")
const port=`${process.env.PORT}` ||9998


const app = express()
app.use(express.json())
app.use(cors())

const {register, login} = require("./controllers/auth.controller");
app.post("/register", register); 
app.post("/login", login);  


app.use("/teachers", teacherController)
app.use('/classes', classController)


app.listen(9999, async function () {
    try {
        await connect()
        console.log('listening on port 9999')
    } catch (error) {
        console.log('error:', error)
    }
})