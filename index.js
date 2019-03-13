require("./dbConn");

var express = require('express');
var path = require('path');
const adminRouter = require('./routes/loginAdmRouter');
const userRouter = require('./routes/userRouter')
let bodyParser = require('body-parser');
let sessions = require('express-session')
var createError = require('http-errors');
let catgoryRouter= require('./routes/categories')
var app = express()

app.set('view engine','ejs')
app.set('views', 'views')

app.use('/cssFiles',express.static(__dirname+ '/public/css'))
app.use(express.static(__dirname+ '/public/'))

console.log((__dirname+ '/public/css'))
app.use(express.urlencoded());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
/*app.use(sessions({
    secret:'fgjhhgah!!@#$%^&*()_4424245',
    resave:false,
    saveUninitialized:false
}))*/

app.use('/Admin',adminRouter)
app.use('/user',userRouter)
app.use('/category' ,catgoryRouter);
const port = 8002


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //  next(createError(404));
 // });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
