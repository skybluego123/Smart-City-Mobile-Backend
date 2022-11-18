const express = require('express');
const router = express.Router();
const Allison = require('../models/allison');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

router.get("/", (req, res, next) => {
    data = Allison.find()
    .select("dt dt_iso timezone city_name lat lon temp feels_like temp_min temp_max pressure sea_level grnd_level humidity wind_speed wind_deg rain_1h rain_3h snow_1h snow_3h clouds_all weather_id weather_main weather_description weather_icon")
    .exec()
    .then(docs => {
    
        const response = {
            
            count: docs.length,
            data: docs.map(doc => {
                let tmz_date = doc.dt_iso.split(' ');
                let act_date = tmz_date[0]+' '+tmz_date[1];
                return {
                    dt: doc.dt,
                    main:{
                        temp:doc.temp,
                        feels_like:doc.feels_like,
                        temp_min:doc.temp_min,
                        temp_max:doc.temp_max,
                        pressure:doc.pressure,
                        sea_level:doc.sea_level,
                        grnd_level:doc.grnd_level,
                        humidity:doc.humidity

                    },
                    weather:[
                        {
                            id:doc.weather_id,
                            main:doc.weather_main,
                            description: doc.weather_description,
                            icon:doc.weather_icon
                        }
                    ],
                    clouds:{
                        all:doc.clouds_all
                    },
                    wind:{
                        speed:doc.wind_speed,
                        deg:doc.wind_deg
                    },
                    rain:{
                        rain_1h: doc.rain_1h,
                        rain_3h:doc.rain_3h
                    },
                    snow: {
                        snow_1h: doc.snow_1h,
                        snow_3h: doc.snow_3h
                    },
                    dt_txt: act_date
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

router.delete("/", (req,res,next)=>{
    Allison.deleteMany({})
    .then(result =>{
        res.status(200).json({
            message: 'Deleted all documents'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router