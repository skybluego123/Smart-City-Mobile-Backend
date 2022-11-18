const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    const user = User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user){
            res.status(409).json({
                error: "Email already exists"
            });
        }else{
            bcrypt.hash(req.body.password,10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                    });
               
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created!"
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        })
                    })
                }
            });
            
        }
    })
    
})

router.get("/", (req, res, next) => {
    User.find()
    .exec()
    .then(users => {
        const response = {
            count: users.length,
            data: users.map(user => {
                return {
                    email: user.email,
                    password: user.password
                }
            })
        }

        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error);
        return res.status(500).json({
            error: error
        })
    })

})

router.post("/login", (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(!user){
            console.log(user);
            return res.status(401).json({
                error: "Authentication failed"
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err){
                return res.send(401).json({
                    error: "Authentication failed"
                })
            }

            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, "success", {
                    expiresIn: "1h"
                })

                return res.status(200).json({
                    message: "Authentication successful", 
                    token: token
                })
            }

            return res.status(401).json({
              message: "Authentication failed"  
            })
        })
    })
    .catch(error => {
        return res.status(401).json({
            message: "Authentication failed"
        })
    })
})

module.exports = router;