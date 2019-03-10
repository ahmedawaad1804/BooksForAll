const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/', (req, res, next) => {
            User.find({
                    email: req.body.email
                })
                .exec()
                .then(user => {
                    // to create users with only unique email
                    const admin = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: "admin",
                        email: "admin@yahoo.com",
                        password: "admin"
                    })
                    admin.save((err, doc) => {
                        res.status(200).json({
                            message: doc
                        });
                    })
                })
            })
            router.get('/login', (req, res) => {

                res.render('pages/LoginForm.ejs');
            })
            router.post('/login', (req, res, next) => {
                User.find({
                        email: "admin@yahoo.com"
                    })
                    .select("password")
                    .exec()
                    .then(user => {
                        if (user[0].password == req.body.password) {
                        
                                res.redirect('/admin/mainPage')
                        
                        } else {
                            return res.status(401).json({
                                message: "password not correct,login failed"
                            });
                        }
                    })
            });
            module.exports = router;