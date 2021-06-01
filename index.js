var express = require("express")
var app = express()
var session = require("express-session")
var flash = require("express-flash")
var cookieParser = require("cookie-parser")

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

app.use(cookieParser("hauhua"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:60000 }
  }))

app.use(flash())

app.get("/",(req,res)=>{

    var emailError = req.flash("emailError") // esse error vai atras de uma flash session que tenha esse nome
    var pontosError = req.flash("pontosError")
    var nomeError = req.flash("nomeError")
    var email = req.flash("email")
    var nome = req.flash("nome")
    var pontos = req.flash("pontos")

    // se não usassemos o ternario seria assim
    // if(emailError != undefined){
    //     if(emailError.length == 0){
    //         emailError = undefined
    //     }
    // }

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    email = (email == undefined || email.length == 0)? "": email
    nome = (nome == undefined || nome.length > 4)?"": nome
    pontos = (pontos == undefined || pontos.length > 20)?"":pontos
    res.render("index",{emailError,pontosError,nomeError,email: email,nome: nome,pontos:pontos})
})

app.post("/form",(req,res)=> {
    var {email,nome, pontos} = req.body // é usado essa variavel aqui para salvar o ultio e-mail que foi digitado

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
    if(nome.length < 4){
        nomeError = "O nome é mt pequeno"
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError",emailError)
        req.flash("pontosError",pontosError)
        req.flash("nomeError",nomeError)
        req.flash("email",email) // recebe a variavel var{emial,nome,pontos} = req.body
        req.flash("nome",nome)
        req.flash("pontos",pontos)
        res.redirect("/")
    }else{
        res.send("SHOW DE BOLA ESSE FORM!")
    }
    
})


app.listen(5678,(req, res) =>{
    console.log("Servidor rodando!")
})