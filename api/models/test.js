const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dt:{
        type: Number,
        required: true
    },
    dt_iso:{
        type: String,
        required: true
    },
    timezone:{
        type: Number,
        required: false
    },
    city_name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required:true
    },
    temp: {
        type: Number,
        required:true
    },
    feels_like: {
        type: Number,
        required:true
    },
    temp_min: {
        type: Number,
        required:true
    },
    temp_max: {
        type: Number,
        required:true
    },
    pressure: {
        type: Number,
        required:true
    },
    sea_level: {
        type: Number,
        required:true
    },
    grnd_level: {
        type: Number,
        required:true
    },
    humidity: {
        type: Number,
        required:true
    },
    wind_speed: {
        type: Number,
        required:true
    },
    wind_deg: {
        type: Number,
        required:true
    },
    rain_1h: {
        type: Number,
        required:true
    },
    rain_3h: {
        type: Number,
        required:true
    },
    snow_1h: {
        type: Number,
        required:true
    },
    snow_3h: {
        type: Number,
        required:true
    },
    clouds_all: {
        type: Number,
        required:true
    },
    weather_id: {
        type: Number,
        required:true
    },
    weather_main: {
        type: String,
        required:true
    },
    weather_description: {
        type: String,
        required:true
    },
    weather_icon: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("Test", dataSchema);