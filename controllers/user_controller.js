var users={
    admin:{id:1,username:"admin",password:"123"},
    jersson:{id:2,username:"jersson",password:"321"}
};

//Comprueba si el usuario esta registrado en users
// Si autenticación falla o hay errores se ejecuta callback(error).

exports.auntenticar=function(login,password,callback){
  if(users[login]){
    if(password === users[login].password){
      callback(null,users[login]);
    }else{
      callback(new Error("Password erróneo."));
    }
  }else{
    callback(new Error('No existe el usuario.'));
  }
}
