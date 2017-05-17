var exports = module.exports = {};
var conn = require("./conn.js");
/* si funciona */
exports.getUserByUser=function(userU,f){
	conn.executeSQLStatement(function(conn){
		conn.query("select * from TBusuarios where nombre_usuario=?",[userU],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
};
/* no funciona */ 
exports.getCoursesByStudent=function(userE,f){
	conn.executeSQLStatement(function(conn){
		conn.query("select * from TBusuarios  where nombre_usuario=?",[userE],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
};


exports.getNameCoursesByNameStudent=function(name,iduser,f){
conn.executeSQLStatement(function(conn){
	conn.query("SELECT c.`nombre_curso` , uc.`id_curso`  FROM `TBusuarios` AS u INNER JOIN `TBusuarios_cursos` AS uc ON u.`id_usuario` = uc.`id_usuario` INNER JOIN `TBcursos` AS c ON uc.`id_curso` = c.`id_curso`WHERE u.`nombre_usuario` = ?",[name],function(err,rows,fields){
		if(err) throw err;
		f(rows);
	});
});
};
//"select d.`id_tarea`, t.`activa`, d.`nota` from `TBdocumentos` as d inner join `TBtareas` as t on t.`id_tarea`=d.`id_tarea` where d.`id_usuario`= ? and t.`id_curso`=? ", [id_usuario,id_materia] 
exports.getTalleresbyId_Curso=function(id_usuario, f){
    conn.executeSQLStatement(function(conn){
        conn.query("select d.`id_tarea`, t.`activa`, d.`nota`,t.`id_curso` from `TBdocumentos` as d inner join `TBtareas` as t on t.`id_tarea`=d.`id_tarea` where d.`id_usuario`= ? ", [id_usuario], function(err,rows,fields){
            if(err) throw err;
            f(rows);
        });
    });
};

exports.getDetalleTalleres=function(id_usuario, f){
    conn.executeSQLStatement(function(conn){
        conn.query("select d.`id_tarea`, t.`activa`, t.`descripcion`, t.`fecha_inicio`, t.`fecha_fin`,  d.`nombre`, d.`nota`,t.`id_curso` from `TBdocumentos` as d inner join `TBtareas` as t on t.`id_tarea`=d.`id_tarea` where d.`id_usuario`= ? ", [id_usuario], function(err,rows,fields){
            if(err) throw err;
            f(rows);
        });
    });
};


exports.getRolByName = function(name, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT rol,nombre_usuario,contraseña FROM TBusuarios where nombre_usuario = ? ", [name], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

//select t.`id_tarea`, t.`descripcion`,t.`fecha_inicio`, t.`fecha_fin`, uc.`id_curso` from `TBtareas` as t inner join `TBusuarios_cursos` as uc on t.`id_curso`=uc.`id_curso` left join `TBdocumentos` as d on t.`id_tarea`=d.`id_tarea` where uc.`id_usuario`=? and d.`id` is NULL

exports.getTalleresPendientes = function(id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("select t.`id_tarea`, t.`descripcion`,t.`fecha_inicio`, t.`fecha_fin`, uc.`id_curso` from `TBtareas` as t inner join `TBusuarios_cursos` as uc on t.`id_curso`=uc.`id_curso` left join `TBdocumentos` as d on t.`id_tarea`=d.`id_tarea` where uc.`id_usuario`=? and d.`id` is NULL", [id], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getNameById = function(id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT nombre_usuario FROM TBusuarios where id_usuario = ? ", [id], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};


exports.checkUserName = function(nombre, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT count(id_usuario),id_usuario FROM TBusuarios where nombre_usuario = ? ", [nombre], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getPass = function(nombre, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT contraseña FROM TBusuarios where nombre_usuario = ? ", [nombre], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};


exports.getCoursesByTeacher = function(id_profesor, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from TBcursos WHERE id_propietario = ? ", [id_profesor], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

//Update `TBdocumentos` as d SET d.`nota`=? where d.id_usuario=? and d.id_tarea=?;
exports.setNotaActividad = function(nota,id_usuario,id_tarea, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Update `TBdocumentos` as d SET d.`nota`=? where d.id_usuario=? and d.id_tarea=? ", [nota,id_usuario,id_tarea], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

//Update `TBtareas` as t SET t.`fecha_inicio`=?, t.`fecha_fin`=?, t.`descripcion`=? where t.id_tarea=? and d.id_tarea=?;
//CAST('2009-05-25' AS DATETIME)
exports.updateActividad = function(fecha_fin,fecha_incio,descripcion,id_tarea, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Update `TBtareas` as t SET t.`fecha_inicio`=CAST(? AS DATETIME), t.`fecha_fin`=CAST(? AS DATETIME), t.`descripcion`=? where t.id_tarea=? ", [fecha_incio,fecha_fin,descripcion,id_tarea], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.nuevaActividad = function(fecha_fin,fecha_inicio,porcentaje_nota,descripcion,activa,id_curso, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("INSERT INTO `TBtareas`(`fecha_inicio`,`fecha_fin`,`porcentaje_nota`,`descripcion`,`activa`,`id_curso`) VALUES (CAST(? AS DATETIME),CAST(? AS DATETIME),?,?,?,?)", [fecha_inicio,fecha_fin,porcentaje_nota,descripcion,activa,id_curso], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};




exports.getDetailActivitiesCoursesByTeacher = function(id_profesor, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT t.id_tarea,t.fecha_inicio,t.fecha_fin,t.descripcion,t.id_curso from TBcursos as c inner join TBtareas as t on t.id_curso=c.id_curso WHERE c.id_propietario = ? ", [id_profesor], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getStudentsByCourse = function(id_curso, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT u.id_usuario,u.nombre_usuario,id_curso FROM TBusuarios_cursos as ec, TBusuarios as u WHERE ec.id_curso=? and ec.id_usuario = u.id_usuario;", [id_curso], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getDocument = function(id_activity, id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("select * from TBdocumentos where id_tarea=? and id_usuario=?; ", [id_activity,id_user], function(err,row,fields){
            if(err) return err;
            complete(row);
        });
});
};

exports.getTalleresByCourse = function(id_curso, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT id_tarea,id_curso FROM TBtareas WHERE id_curso=?;", [id_curso], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getUserType = function(id_usuario, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("select u.`rol` from `TBusuarios` as u where u.`id_usuario`=?;", [id_usuario], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};



