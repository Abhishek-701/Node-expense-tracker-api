const express = require('express')
require('./config/db')

const app = express()
const expenseRouter = require('./routers/expenseRouter')

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api', expenseRouter)

app.get('/', (req,res) => {
    res.send("Hello User")
})

app.listen(port , () => {
    console.log("Server up and running");
})