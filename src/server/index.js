const express = require('express')
const mongoose = require('mongoose')
const Food = require('./schema')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())
const portNo = process.env.PORT || 8081

const serverAddr = '127.0.0.1:27017'

// MongoDB Connection
mongoose.connect(`mongodb://${serverAddr}/Nutrition`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB...")
}).catch((error) => {
    console.log(error)
})


app.post('/food/create/', (req, res) => {
    const food = req.body
    let foodObj = new Food(food)
    foodObj.save().then(
        res.send({ 
            payload:req.body,
            status: 'Food stored'
        })
    )
})

app.get('/foods',async(req,res)=>{
    let foods = await Food.find();
    res.send({ 
        payload:foods
    })
})


app.get('/demo', (req, res) => {
    res.send("Response")
})



app.listen(portNo, () => {
    console.log(`Server is running at ${portNo}...`)
})