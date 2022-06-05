use zs4a
show collections

// Crear una coleccion y validarla con JsonSchema

db.createCollection
(
    "estudiantes",
    {
        validator: 
        {
            $jsonSchema:
            {
                bsonType: "object",
                required: ["nombre", "anio", "curso", "direccion"],
                properties: 
                {
                    nombre: 
                    {
                        bsonType: "string",
                        description: "debe de ser string y es obligatorio su ingreso"
                    },
                    anio:
                    {
                        bsonType: "int",
                        minimum: 2016,
                        maximum: 2030,
                        description: "debe ser entero entre [2016, 2030] y es obligatorio su ingreso"
                    },
                    curso:
                    {
                        enum: ["Matematicas", "Ingles", "Ciencias", "Historia", null],
                        description: "solo se puede ingresar uno de los valores de la lista y es obligatorio su ingreso"
                    },
                    direccion:
                    {
                        bsonType: "object",
                        required: ["ciudad"],
                        properties: 
                        {
                            calle: 
                            {
                                bsonType: "string",
                                description: "debe ser string si se ingresa algun valor"
                            },
                            ciudad:
                            {
                                bsonType: "string",
                                description: "debe ser string y es obligatorio su ingreso"                                
                            }
                        }
                    }                    
                }
            }
        }
    }
)

db.estudiantes.insertOne(
    {
        nombre: "Emilio",
        anio: NumberInt(2019),
        curso: "Historia",
        direccion: 
        {
            ciudad: "Lima",
            calle: "Calle Las Totoritas 12345"
        }
    }
)

db.estudiantes.find()
db.getCollection("estudiantes").find({})

db.estudiantes.insertOne(
    {
        nombre: "Jhomax",
        anio: NumberInt(2017),
        curso: "Ciencias",
        direccion: 
        {
            ciudad: "Lima"

        }
    }
)

db.estudiantes.insertOne({ nombre: "Carlos", apellidos: "Valverde", anio: NumberInt(2022), curso: "Historia", direccion: {ciudad: "Arequipa", calle: "Las flores 123" } } )

db.createCollection
(
    "creditos", 
    {
        validator:
        {
            $jsonSchema:
            {
                required: ["nombre", "dni", "resultado"],
                properties:
                {
                    nombre:
                    {
                        bsonType: "string",
                        description: "debe ingresar un string en forma obligatoria"
                    },
                    dni:
                    {
                        bsonType: "string",
                        description: "debe ingresar un string en forma obligatoria"
                    },
                    resultado:
                    {
                        bsonType: "object",
                        required: ["riesgo"],
                        properties: 
                        {
                            calificacion: 
                            {
                                bsonType: "string"                                
                            },
                            riesgo:
                            {
                                bsonType: "string",
                                description: "debe de ingresar un string en forma obligatoria"
                            }
                            
                        }
                    }
                }
            }
        }
    }
)

db.creditos.insertOne
(
    {
        nombre: "Jaime Saavedra",
        dni: "09876543",
        resultado:
        {
            calificacion: "Aprobado",
            riesgo: "1"
        }
    }
)

db.creditos.find()

db.creditos.insertOne
(
    {
        nombre: "Clara Horna",
        dni: "09876987",
        resultado:
        {
            riesgo: "5"
        }
    }
)

db.creditos.insertOne
(
    {
        nombre: "Marco",
        apellidos: "Diaz",
        dni: "10987689",
        resultado:
        {
            riesgo: "3",
            calificacion: "Condicionada"
        }
    }
)

db.createCollection
(
    "contactos",
    {
        validator:
        {
            $jsonSchema: 
            {
                 bsonType: "object",
                 required: ["telefono"],
                 properties:
                 {
                    telefono:
                    {
                        bsonType: "string",
                        description: "debe ser string y es obligatorio"
                    },
                    email:
                    {
                        bsonType: "string",
                        pattern: "@mongodb\.com$",
                        description: "debe ser string y seguir el regular expression"
                    },
                    estado:
                    {
                        enum: ["desconocido", "incompleto", "completo"],
                        description: "solo puede tomar alguno de los valores enumerados"
                    }
                 }
            }            
        },
        validationAction: "warn"
    }
)

db.contactos.insertOne
(
    {
        nombre: "Percy",
        estado: "completo"
    }
)

db.contactos.find()

db.createCollection
(
    "contactos2",
    {
        validator:
        {
            $jsonSchema: 
            {
                 bsonType: "object",
                 required: ["telefono"],
                 properties:
                 {
                    telefono:
                    {
                        bsonType: "string",
                        description: "debe ser string y es obligatorio"
                    },
                    email:
                    {
                        bsonType: "string",
                        pattern: "@mongodb\.com$",
                        description: "debe ser string y seguir el regular expression"
                    },
                    estado:
                    {
                        enum: ["desconocido", "incompleto", "completo"],
                        description: "solo puede tomar alguno de los valores enumerados"
                    }
                 }
            }            
        }
    }
)

db.contactos2.insertOne
(
    {
        nombre: "Percy",
        estado: "completo",
        telefono: "3456722"
    }
)


db.contactos2.find()

db.doctores.insertOne
(
    {
        nombreUsuario: "carlos",
        contacto:
        {
            telefono: "987654780",
            correo: "eldoc@gmail.com"
        },
        acceso: 
        {
            nivel: "5",
            grupo: "cardiologos"
        }        
    }
)

db.doctores.find()

// Agregaciones

db.pizzas.insertMany
(
    [
        { "nombre": "continental", tamanio: "familiar", "cantidad": 2 },
        { "nombre": "labrava", tamanio: "medio", "cantidad": 3 },
        { "nombre": "continental", tamanio: "familiar", "cantidad": 5 },
        { "nombre": "labrava", tamanio: "medio", "cantidad": 1 },
        { "nombre": "labrava", tamanio: "familiar", "cantidad": 3 },
        { "nombre": "labrava", tamanio: "personal", "cantidad": 1 },
        { "nombre": "continental", tamanio: "medio", "cantidad": 4 }        
    ]
)


db.pizzas.find()

db.pizzas.aggregate
(
    [
        {
            $match: { tamanio: "familiar"}
        },
        {
            $group: { _id: "$nombre", totalCantidad: { $sum: "$cantidad"} }
        }
    ]
)
