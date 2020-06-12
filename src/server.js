const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("src/views", {
  express:server,
  autoescape: false,
  noCache: true
})



server.get("/", function(req, res){
    return res.render("index", {title: "um titulo"})
})

server.get("/create_point", function(req, res){
  return res.render("create_point")
})

server.get("/search", function(req, res){
  return res.render("search_results")
})


//porta em que o servidor roda
server.listen(3000, function(){
  console.log("server is running")
})
