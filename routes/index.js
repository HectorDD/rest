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
  var myUserId = req.body.id;
  var respuesta = [];
  db_users.getNameCoursesByNameStudent(myUser,myUserId,function(rows,fields){
    respuesta = rows;
    res.json({res : respuesta});
    
  });
});

/*toma los talleres de los cursos en donde esta matriculado el estudiante basado en su nombre*/
router.post('/getTalleres', function(req, res, next) {
  var myUser = req.body.id;
  db_users.getTalleresbyId_Curso(myUser,function(rows2,fields){
      res.json({talleres: rows2});
  });
});

/*toma el estado del documento para actualizar la tarea*/
router.post('/getStatusDocument', function(req, res, next) {
  var id_activity= req.body.id_activity;
  var id_user= req.body.id_user;
  var estado = "";
  db_users.getStatusDocument(id_activity,id_user,function(rows,fields){
    if (rows == -1){
      estado = "Pendiente";
      res.json({estado: estado});
    }
    else{
        if (rows[0]["nota"]==null){
           estado = "Subido";
        }else {
           estado = "Calificado";
        }
        res.json({estado: estado, nota: rows[0]["nota"]});
    }
    
  });
});

/*toma los talleres de los cursos en donde esta matriculado el estudiante basado en su nombre*/
router.post('/getDetallesTalleres', function(req, res, next) {
  var myUser = req.body.id;
  db_users.getDetalleTalleres(myUser,function(rows2,fields){
      for (var i in rows2) {
        var hoy = new Date();
        var estado = "Pendiente";
        var TotalDias = Math.abs(rows2[i]["fecha_fin"].getTime() - rows2[i]["fecha_inicio"].getTime());
        var ParcialDias = Math.abs(rows2[i]["fecha_fin"].getTime() - hoy.getTime());
        var tDias= Math.ceil(TotalDias / (1000 * 3600 * 24));
        var pDias= Math.ceil(ParcialDias / (1000 * 3600 * 24));
        var porcent = (pDias/tDias);
        if (porcent >= 1){
          rows2[i].porcentaje = 100
        }else{
          rows2[i].porcentaje = (porcent*100);
        }
        var dfin = rows2[i]["fecha_fin"].getDate();
        var dini = rows2[i]["fecha_inicio"].getDate();
        var mfin = rows2[i]["fecha_fin"].getMonth(); + 1
        var mini = rows2[i]["fecha_inicio"].getMonth(); + 1
        var afin = rows2[i]["fecha_fin"].getFullYear();
        var aini = rows2[i]["fecha_inicio"].getFullYear();
        
        var fin = mfin+'/'+dfin+'/'+afin;
        var inicio = mini+'/'+dini+'/'+aini;
        
        if (rows2[i]["nota"]==null){
           estado = "Subido";
        }else {
           estado = "Calificado";
        }
        rows2[i].estado = estado;
        rows2[i]["fecha_inicio"] = inicio;
        rows2[i]["fecha_fin"] = fin;
      }
      res.json({talleres: rows2});
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Servicio rest SNJ' });
});

router.post('/getCoursesByTeacher', function(req, res, next) {
  var myUser = req.body.id;
  db_users.getCoursesByTeacher(myUser,function(rows2,fields){
    res.json({cursos : rows2});
  });

});

router.post('/getStudentsByCourse', function(req, res, next) {
  var myCourse = req.body.id;
  db_users.getStudentsByCourse(myCourse,function(rows2,fields){
    res.json({estudiantes : rows2});
  });

});

router.post('/getTalleresByCourse', function(req, res, next) {
  var myCourse = req.body.id;
  db_users.getTalleresByCourse(myCourse,function(rows2,fields){
    res.json({talleres : rows2});
  });

});



module.exports = router;
