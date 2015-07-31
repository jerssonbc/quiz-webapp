//Definición del modelo quiz

module.exports=function(sequelize,DataTypes){
  return sequelize.define('Quiz',
                  {
                    pregunta:{
                      type: DataTypes.STRING,
                      validate:{notEmpty:{msg:"-> Falta Preguna"}}
                    },
                    respuesta:{
                      type: DataTypes.STRING,
                      validate:{notEmpty:{msg:"-> Falta Respuesta"}}
                    }
                  });
}
