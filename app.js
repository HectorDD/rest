var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/uservalidation', users);
app.use('/users', users);
app.use('/rolByUser', users);
app.use('/isUser', users);
app.use('/cursesByName', users);
app.use('/nameById', users);
app.use('/userValidated', users);
app.use('/getTalleres', users);
app.use('/getDetallesTalleres', users);
app.use('/getTalleresPendientes', users);
app.use('/getDocument', users);
app.use('/getUserType', users);
app.use('/getCoursesByTeacher', index);
app.use('/getCourses', index);
app.use('/getAdministradores', index);
app.use('/getProfesores', index);
app.use('/getEstudiantes', index);
app.use('/setNotaActividad',index);
app.use('/updateActividad',index);
app.use('/nuevaActividad',index);
app.use('/nuevoCurso',index);
app.use('/nuevoDocumento',index);
app.use('/nuevaMatricula',index);
app.use('/nuevoEstudiante',index);
app.use('/getUsuariosCursos',index);
app.use('/getDetailActivitiesCoursesByTeacher',index);
app.use('/getStudentsByCourse', index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8081);
module.exports = app;
