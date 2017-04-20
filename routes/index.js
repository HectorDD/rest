var express = require('express');
var router = express.Router();
var db_users = require('../persistence/users');

router.post('/uservalidation', function(req, res, next) {
  var myUser = req.body.user;
  var myPassword = req.body.password;
  db_users.getUserByUser(myUser,function(rows, fields) {
    /* El siguiente if sirve para verificar si el usuario y contraseña 
    concuerdan cuando el usuario existe*/
    if(rows[0]!=undefined){
      if(rows[0].nombre_usuario == myUser && rows[0].contraseña == myPassword )
      {
        res.json({respuesta:"true",id:rows[0].id_usuario,rol:rows[0].rol});
      }
      /* Cubre el caso en el que el usuario existe pero la contraseña 
      está mal*/
      else
      {
        res.json({respuesta:"false",id:-1,rol:0});
      }
    }
    /* Cubre el caso en el que el usuario no existe*/
    else{
      res.json({respuesta:"false",id:-2,rol:0});
    }
    });
    
});

/*Entrega todos los usuarios registrados con sus datos*/
router.post('/users', function(req, res, next) {
  var myUser = req.body.user;
  var myPassword = req.body.password;
  db_users.getUserByUser(myUser,function(rows, fields) {
    console.log(rows);
    res.json(rows);
    });
    
});

/*Entrega el rol de un usuario en particular*/
router.post('/rolByUser', function(req, res, next) {
  var myUser = req.body.user;
  var myPassword = req.body.password;
  db_users.getRolByName(myUser,function(rows,fields){
    if(rows[0].nombre_usuario == myUser && rows[0].contraseña == myPassword )
    {
        res.json({rol: rows[0].rol});
    }
      
    });
});

/*Verifica si un nombre de usuario esta en la base de datos*/
router.post('/isUser', function(req, res, next) {
  var myUser = req.body.user;
  db_users.checkUserName(myUser,function(rows,fields){
    res.json({res: rows});
  });
});


/*verifica si la contraseña ingresada es del usuario registrado*/
router.post('/userValidated', function(req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  db_users.checkUserName(user,function(rows,fields){
    if (rows["count(id_usuario)"]!=0){
      db_users.getPass(user,function(rows,fields){
      if(rows[0]["contraseña"] == password)
      {
          res.json({res: "isUser"});
      }
      else{
          res.json({res: "isNotUser"});
      }
        
      });
    }else{
      res.json({res: "isNotUser"});
    }
    
  });
  
});

/*get name curse by id user*/
router.post('/cursesByName', function(req, res, next) {
  var name = req.body.name;
  console.log(name);
  db_users.getNameCoursesByNameStudent(name,function(rows,fields){
    console.log(rows);
    res.json({res: rows});
  });
});

/*get name user by id user*/
router.post('/nameById', function(req, res, next) {
  var id = req.body.id;
  db_users.getNameById(id,function(rows,fields){
    res.json({res: rows});
  });
});


/*toma los nombres de los cursos en donde esta matriculado el estudiante*/
router.post('/cursesByName', function(req, res, next) {
  var myUser = req.body.name;
  console.log(myUser);
  db_users.getNameCoursesByNameStudent(myUser,function(rows,fields){
    res.json({res: rows});
  });
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Servicio rest SNJ' });
});

module.exports = router;
