const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRoutes')
const app = express();


const port = process.env.PORT ||3000

app.use(express.json());
app.use(userRouter);

const server = app.listen(port,()=>{
    console.log(`server is on port ${port}`)
})

module.exports = { app, server };