var models=require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load=function(req,res,next,quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz=quiz;
        next();
      }else{
        next(new Error('NO existe quizId='+quizId));
      }
    }
  ).catch(function(error){ next(error);})
};


//GET /quiezes
exports.index=function(req,res){
  var search=req.query.search;
  if(search){
      var texto_a_buscar=(search || '').replace(" ","%");
      console.log(texto_a_buscar);
      models.Quiz.findAll({where:["pregunta like ? ",'%'+texto_a_buscar+'%'],
                          order:'pregunta ASC'}).then(
        function(quizes){
          res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
        }
      ).catch(function(error){next(error);})
  }else{
      models.Quiz.findAll().then(
        function(quizes){
          res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
        }
      ).catch(function(error){next(error);})
  }

};

// GET /quizes/:id
exports.show=function(req,res){
    res.render('quizes/show',{quiz:req.quiz,errors:[]});
};

// GET /quizes/:id/answer

exports.answer=function(req,res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta){
      resultado='Correcto'
  }
  res.render('quizes/answer',
              {quiz:req.quiz, respuesta:resultado,errors:[]});
};

//GET /quizes/new
exports.new=function(req,res){
    var quiz=models.Quiz.build( //crea objeto quiz
      {pregunta:"Pregunta",respuesta:"Respuesta"}
    );
    res.render('quizes/new',{quiz:quiz,errors:[]});
};

// POST /quizes/create

exports.create=function(req,res){
  var quiz=models.Quiz.build(req.body.quiz);
  var errors=quiz.validate();
  if(errors){
    var i=0;
    var errores=new Array();
    //se convierte en [] con la propiedad message por compatibilida con layout
    for(var prop in errors){
      errores[i++]={message:errors[prop]};
    }
    res.render('quizes/new',{quiz:quiz,errors:errores});
  }else{
    // guarda en la DB los campos pregutn y respuesta de quiz
    quiz.save({fields:["pregunta","respuesta"]}).then(function(){
      res.redirect('/quizes');
      // res.reditect :Redireccioin HTTP a lista de preguntas
    })
    }
};
