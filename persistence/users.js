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

exports.getStudentsByCourse = function(id_curso, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT u.id_usuario,u.nombre_usuario,id_curso FROM TBusuarios_cursos as ec, TBusuarios as u WHERE ec.id_curso=? and ec.id_usuario = u.id_usuario;", [id_curso], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getStatusDocument = function(id_activity, id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("select nota from TBdocumentos where id_tarea=? and id_usuario=?; ", [id_activity,id_user], function(err,row,fields){
            if(err){ return err;}
            else if (!row.length) {                                                   
                row = -1;
            }
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


