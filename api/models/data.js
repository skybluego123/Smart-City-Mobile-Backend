const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    compass: {
        type: Number,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date, 
        default: Date.now
    },
    angle: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);
