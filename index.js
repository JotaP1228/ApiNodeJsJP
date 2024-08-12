const exp = require("express");
const modeloUsuarios = require("./backend/models/user.model")
require("dotenv").config();

const app = exp();

app.set("view engine", "ejs");

app.get("/mostrar", (req, res) => {
    
})

const logger = require("morgan")
app.use(logger("dev"));

app.use(exp.urlencoded({ extended: false }));
app.use(exp.json())

app.get("/conectar", async (req, res) => {
    const consulta = await modeloUsuarios.find({});
    console.log(consulta)

});

app.get('/usuario/:re', async (req,res)=>{
    let usuarioEncontrado = await modeloUsuarios.findOne({correo: req.params.re});
    if (usuarioEncontrado)
        res.status(200).json(usuarioEncontrado);
    else 
        res.status(404).json({"error": "Usuario no encontrado"})
})



app.post("/crear", async (req, res) => {


    const nuevoUsuario = {
        correo: req.body.correo,
        pass: req.body.pass,

    };
    let insercion = await modeloUsuarios.create(nuevoUsuario);
    if (insercion)
        res.status(200).json({ "mensaje": "registro exitoso" })
    else
        res.status(404).json({ "mensaje": "Se presentó un error" })
})

app.put('/usuario/:campo', async (req,res)=>{
    const usuarioEditado ={
        correo: req.body.correo,
        pass: req.body.pass,
        rol : req.body.rol,
        habilitado: true,
    }
    let actualizar = await modeloUsuario.findOneAndUpdate({correo:req.params.campo},usuarioEditado);
    if(actualizar)
        res.status(200).json({"mensaje": "se actualizo correctamente"})
    else
        res.status(404).json({"mensaje": "No se actualizo"})
})

app.delete('/usuario/:id', async (req, res) => {
    console.log(req.params.id , req.body.referenciaProducto)
    let eliminacion = await modeloProducto.findByIdAndDelete({referencia:req.params.id});
    if(eliminacion)
        res.status(200).json({"mensaje":"Eliminación exitosa"})
    else
        res.status(404).json({"mensaje":"Se presentó un error"})
});


app.listen(process.env.PORT)

