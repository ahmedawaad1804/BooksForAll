const express = require('express');
const adminRouter = require('./routes/adminRouter');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/goodReads', () => {
    console.log('connected to mongodb');
})

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded());

app.use('/admin', adminRouter);

app.listen(3000, () => {
    console.log('started server on port 3000')
})


