const express = require('express');
const router = express.Router();
const Pole = require('../models/pole');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

router.get("/", (req, res, next) => {
    console.log("hey")
    data = Pole.find()
    .select("latitude longitude altitude id manual_id age_10to30 angle_3to21 updated_angle")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            data: docs.map(doc => {
                return {
                    latitude: doc.latitude,
                    longitude: doc.longitude,
                    altitude: doc.altitude,
                    id: doc.id,
                    manual_id: doc.manual_id,
                    age: doc.age_10to30,
                    angle: doc.angle_3to21,
                    updated_angle: doc.updated_angle
                }
            })
        }

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.send(500).json({
            error: err
        })
    })
    
})

module.exports = router