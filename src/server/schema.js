const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number
})

module.exports = mongoose.model("Food",FoodSchema)