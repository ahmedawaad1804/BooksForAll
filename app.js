const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const userRoute=require('./api/routes/users');
const adminRoute=require('./api/routes/admins');

const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://Admin:admin@bookshelves-lpztr.mongodb.net/test?retryWrites=true', () => {
//     console.log('connected to mongodb');
// })
mongoose.connect('mongodb://localhost:27017/bookStore', () => {
    console.log('connected to mongodb');
})
mongoose.Promise = global.Promise;

app.use(morgan("dev"));

app.set('view engine', 'ejs')
app.set('views', 'views')

// to make folder publicly accessible
app.use('/uploads', express.static('uploads'));

//render public Static files (css)
// Set public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//Routes which handel requests  

app.use('/users',userRoute);
app.use('/admin',adminRoute);


app.get('/', (req, res) => {

    res.render('/public/index.html');
})
app.use((req, res, next) => {
    const error = new Error('not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }

    });
});

module.exports = app;