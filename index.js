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
    console.log(" Está rodando....")
    res.send("Rodando...")
})

app.listen(5678,(req, res) =>{
    console.log("Servidor rodando!")
})