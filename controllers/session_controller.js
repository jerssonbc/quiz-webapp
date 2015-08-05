//Get /login -- Formulario Login

exports.new=function(req,res){
  var errors=req.session.errors || {};
  req.session.errors={};
  res.render('sessions/new',{errors:errors});
};

//POST /login --Crear la session

exports.create=function(req,res){
  var login =req.body.login;
  var password= req.body.password;
  var userController=require('./user_controller');
  userController.auntenticar(login,password,function(error,user){
    if(error){ //si hay error retornamos mensaje de error de sesión
      req.session.errors=[{"message":'Se ha producido un error '+error}];
      res.redirect('/login');
      return;
    }
    // crear req.session.user y guardar los campos id, y username
    //La sesión  se define por la existencia de : req.session.user
    req.session.user={id:user.id, username:user.username};
    res.redirect(req.session.redir.toString());//redirecion al paht anterio al login
  });
};

exports.destroy=function(req,res){
  delete req.session.user;
  res.redirect(req.session.redir.toString());//redirecion al paht anterio al login
};

// MW de autorizacion de accessos HTTP restringidos
exports.loginRequired=function(req,res,next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
}
