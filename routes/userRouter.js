const express = require('express')
const userModel = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
    userModel.find((err, users) => {
        res.render('pages/users.ejs', {
            users: users
        })
    })
})
router.get('/new', (req, res) => {
    res.render('pages/addNewUsers.ejs');
})
router.get('/:id', (req, res) => {
    var id = req.params.id;
    userModel.findById(id,(err, users) => {
        res.render('pages/users.ejs', {
            users: users
        })
    })
})
router.get('/:id/delete', (req, res) => {
    var id = req.params.id;
    userModel.findByIdAndRemove(id,(err)=>{}) //userModel.deleteOne({_id:id},(err)=>{console.log("confirm delete")});
    res.redirect('/users/');
})
router.get('/:id/edit', (req, res) => {
    res.render('pages/editUser.ejs');
    // userModel.findByIdAndUpdate()
    // res.redirect('/users/');
    //res.send('my route is /:id/edit')
})
router.post('/', (req, res) => {
    const user = new userModel({
        name: req.body.firstname,
        age: req.body.age,
    })
    user.save((err, doc) => {
        res.redirect('/users/');
    })
})

module.exports = router;
