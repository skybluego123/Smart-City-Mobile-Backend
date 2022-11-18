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
    altitude:{
        type: Number,
        required: false
    },
    geometry: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required:true
    },
    s1: {
        type: Number,
        required:true
    },
    s2: {
        type: Number,
        required:true
    },
    group: {
        type: Number,
        required:true
    },
    manual_id: {
        type: Number,
        required:true
    },
    age_10to30: {
        type: Number,
        required:true
    },
    angle_3to21: {
        type: Number,
        required:true
    },
    fw: {
        type: Number,
        required:true
    },
    bw: {
        type: Number,
        required:true
    },
    updated_angle: {
        type: Number
    }
});

module.exports = mongoose.model("Pole", dataSchema);