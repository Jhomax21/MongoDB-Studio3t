use prueba
show collections

db.createCollection
(
    "estudiantes",
    {
    validator:
    {
        $jsonSchema:{
            bsonType:"object",
            required: ["nombre","anio","curso","direccion"],
            properties:{
                nombre:
                {
                bsonType:"string",
                description:"se pone nombre"
                },
                anio:{
                    bsonType:"int",
                    minimum:2019,
                    maximum:2030,
                    description:"se ingresa anio de 2019 a 2030"
                },
                curso:{
                  enum:["Fisica", "calculo", "base de datos", null]  
                },
                direccion:
                {
                    bsonType:"object",
                    required:["calle"],
                    properties:
                    {
                        calle:{
                        bsonType:"string",
                        description:"se pone la calle del usuario"
                        }
                        
                    }
                    
                }
            }
            
        }
        
        
    }
   
    }
)

db.estudiantes.deleteOne({"nombre":"Isabel"})
db.estudiantes.insertOne({"nombre":"Isabel","anio":NumberInt(2025),"curso":"base de datos", "direccion":{calle:"Nestor Batanero"}})
db.estudiantes.find()
