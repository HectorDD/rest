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
}
/* no funciona */ 
exports.getCoursesByStudent=function(userE,f){
	conn.executeSQLStatement(function(conn){
		conn.query("select * from TBusuarios  where nombre_usuario=?",[userE],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
}


exports.getNameCoursesByNameStudent=function(name,f){
conn.executeSQLStatement(function(conn){
	conn.query("SELECT c.`nombre_curso` FROM `TBusuarios` as u  inner join `TBusuarios_cursos` as uc on u.`id_usuario` = uc.`id_usuario` inner join `TBcursos` as c on uc.`id_curso` = c.`id_curso` where u.`nombre_usuario` = ?",[name],function(err,rows,fields){
		if(err) throw err;
		f(rows);
	});
});
}

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
