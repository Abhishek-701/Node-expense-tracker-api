const express = require('express')
require('./db/db')

const app = express()
const expenseRouter = require('./routers/expenseRouter')
const authRouter = require('./routers/authRouter')

const port = process.env.PORT 

app.use(express.json())

app.use('/api', expenseRouter)
app.use('/api/auth', authRouter)

app.get('/', (req,res) => {
    res.send("Hello User")
})

app.listen(port , () => { 
    console.log("Server up and running at port: " + port);
})