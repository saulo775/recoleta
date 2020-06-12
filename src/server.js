const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const db = require("./database/db.js")

server.use(express.static('public'))


//habilitar uso do req.body

server.use(express.urlencoded({extended: true}))

server.set("view engine", "njk")

nunjucks.configure("src/views", {
  express:server,
  autoescape: false,
  noCache: true
})



server.get("/", function(req, res){
    return res.render("index", {title: "Um titulo"})

})



 

server.get("/create_point", function(req, res){
  return res.render("create_point")
  
})

server.post("/savepoint", (req, res)=>{

  //req.query == query strings da url

  //req.body == corpo do formulário

  //console.log(req.body)
  
  //inserir dados no banco de dados

     const query = `
        INSERT INTO places (
            image,
            name,
            addres,
            addres2,
            state,
            city,
            items

        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
      req.body.image,
      req.body.name,
      req.body.addres,
      req.body.addres2,
      req.body.state,
      req.body.city,
      req.body.items
      
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create_point",{saved: true})
    }

    db.run(query, values, afterInsertData)
    

  })



server.get("/search", function(req, res){

  const search = req.query.search

  if(search == ""){
    return res.render("search_results",{total: 0})
  }



  //pegar os dados do banco de dados 
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
             console.log(err)
             return res.send("ERRO NO CADASTRO")
        }
        
        const total = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search_results",{places: rows, total: total})
    })
})


//porta em que o servidor roda
server.listen(3000, function(){
  console.log("server is running")
})
