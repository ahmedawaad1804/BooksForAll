const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// handel incoming routes to /user
//login
router.get('/login', (req, res) => {

    res.render('pages/LoginForm.ejs');
})
//signup
router.get('/signup', (req, res) => {

    res.render('pages/SignUpForm');
})
router.post('/signup', (req, res, next) => {
    // to make sure that not to create a user for an email that has been taken
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            // to create users with only unique email
            if (user.length >= 1) {
                //conflict 
                return res.status(409).json({

                    message: "Email already exists "
                })

            } else {
                // salt is rondm string added to your hash (10 rounds)
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })

                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                res.redirect('/users/login')

                            })

                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })

                            })

                    }
                });
            }
        })


});
router.post('/login', (req, res, next) => {

    User.find({
            email: req.body.email
        })
        .exec()
        // array of users 
        .then(user => {
            // we got no user 
            if (user.length < 1) {
                //un authirized 
                return res.status(401).json({
                    message: "Email Not exists user doesn't exists   "
                })
            } else {
                // salt is rondm string added to your hash (10 rounds)
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "authintication process failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                user_id: user[0]._id,
                                email: user[0].email
                            },
                           "jwtKey",{
                                expiresIn:"1h"
                            })
                        return res.status(200).json({
                            message: "password is correct ",
                            token:token
                        });
                    }
                    return res.status(401).json({
                        message: "password not correct,login failed"
                    });
                });
            }
        })


});
// delete a user 
router.delete('/:userId', (req, res, next) => {
    User.remove({
            _id: req.params.userId
        })
        .exec()
        .then(result => {
            user.find((err, users) => {
                res.render('pages/users', {
                    users: users
                })
            })
            res.status(200).json({
                message: "user Deleted",
                request: {
                    type: 'POST',
                    url: "http://localhost:4000/users",
                    body: {
                        userId: "ID",
                        name: "String",
                        email: "String"
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});


module.exports = router;
