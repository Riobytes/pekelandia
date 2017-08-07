var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors'); //add cors

var routes = require('./routes/index');
var users = require('./routes/users');
var quotes = require('./routes/quotes'); //quotes
var todos = require('./routes/todos'); //quotes

var jwt     = require('express-jwt');
var config  = require('./config');

var app = express();
var jwtCheck = jwt({
  secret: config.secretKey
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors()); //add cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //false ==> true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users); //change to below line
app.use(users);
app.use(quotes); //quotes
app.use(todos); //todos
app.use('/api',require('./routes/apiUsuarios'));
app.use('/api',require('./routes/routerTestCedulas'));
app.use('/api',require('./routes/apiJornada'));
//passport.authenticate('jwt', { session: false })
app.use('/api', jwtCheck,require('./routes/apiTipoPadres'));
app.use('/api',require('./routes/apiNivel'));
app.use('/api',require('./routes/apiPadres'));
app.use('/api',require('./routes/apiRefrigerio'));
app.use('/api',require('./routes/apiMatricula'));
app.use('/api',require('./routes/apiEstuPadres'));
app.use('/api',require('./routes/apiEstudiantes'));
app.use('/api',require('./routes/apiNoticia'));
app.use('/api',require('./routes/apiFactura'));
app.use('/api',require('./routes/apiPeriodo'));
app.use('/api',require('./routes/apiCargos'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.listen(3000);
console.log("servidor ejecutando en el puerto 3000");

