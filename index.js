var express = require("express")
var app = express()
var session = require("express-session")
var flash = require("express-flash")

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(flash())

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/form",(req,res)=> {
    var {email,nome, pontos} = req.body

    var emailError
    var pontosError
    var nomeError

    //validação de e-mail
    if(email == undefined || email==""){
        emailError = "O e-mail não pode ser vazio" // o que vai ser mostrado caso o usuario não coloque um endereço valido

    }
    //validação de pontos
    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos" // o que vai ser mostrado caso o usuario não coloque um endereço valido
    }
    //validação de nome
    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio"

    }
    if(emailError !=)
    res.send(email)
})


app.listen(5678,(req, res) =>{
    console.log("Servidor rodando!")
})