var mongoose = require("mongoose");

var categoryschema = new mongoose.Schema({
    title: String,
    image: String,
}, { timestamps: true })

const Category = mongoose.model('category', categoryschema);
module.exports = Category;