const express = require('express');
const router = express.Router();
const multer = require('multer');
const Data = require('../models/data');
const mongoose = require('mongoose');
const request = require('request')
const fs = require('fs')
const fetch = require("node-fetch");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const hostname = 'http://backend.digitaltwincities.info/'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }

};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get("/", (req, res, next) => {

    data = Data.find()
    .select("longitude latitude compass image classification createdDate angle")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            data: docs.map(doc => {
                return {
                    latitude: doc.latitude,
                    longitude: doc.longitude,
                    compass: doc.compass,
                    classification: doc.classification,
                    createdDate: doc.createdDate,
                    image: hostname+doc.image,
                    angle: doc.angle
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

router.post("/", upload.single('image'),(req, res, next)=>{

    if(req.body.classification === 'Blackout Related Object') {

      console.log("Uploaded image related to classification - Blackout Related Object")

      image_base64 = fs.createReadStream(req.file.path, {encoding: 'base64' })

      fetch('https://mbj54a7j3k.execute-api.us-west-2.amazonaws.com/Prod/segmentation', {
        method: "POST", 
        body: image_base64
        }).then((response) => response.json(), error => res.status(500).json({error:error}))
          .then(prediction => {

          angle = prediction['predicted_label']
          console.log('The obtained angle is ' + angle)
          data = new Data({
              _id: new mongoose.Types.ObjectId(),
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              compass: req.body.compass,
              classification: req.body.classification,
              image: req.file.path,
              angle: angle
          });
    
          data
          .save()
          .then(result=>{
              console.log(result);
              res.status(201).json({
                  message: 'Added the image successfull with angle ' + angle
              })
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  error: err
              })
          })

        }, function(error){
            res.status(500).json({error:error})
        });
      }else {
     console.log("Uploaded image related to classification - Flood Related Object")
     data = new Data({
         _id: new mongoose.Types.ObjectId(),
         latitude: req.body.latitude,
         longitude: req.body.longitude,
         compass: req.body.compass,
         classification: req.body.classification,
         image: req.file.path,
         angle:0
     });

     data
     .save()
     .then(result=>{
         console.log(result);
         res.status(201).json({
             message: 'Added the image successfull'
         })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         })
     })
     }
});

// router.post("/", upload.single('image'),(req, res, next)=>{
//     data = new Data({
//         _id: new mongoose.Types.ObjectId(),
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         compass: req.body.compass,
//         classification: req.body.classification,
//         image: req.file.path,
//         angle:0
//     });

//     data
//     .save()
//     .then(result=>{
//         console.log(result);
//         res.status(201).json({
//             message: 'Added the image successfull'
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     })
// });

// Delete everythin in the server
router.delete("/", (req,res,next)=>{
    Data.deleteMany({})
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
module.exports = router;
