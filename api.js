const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
const http = require('http');
var cors = require('cors')



var app = express(); 

app.use(bodyParser.json());
app.use(cors());
app.use(router);


router.get("/api/symbols/", (req, res) => {
    let rawdata = fs.readFileSync('./source/symbols.json');
    let symbols = JSON.parse(rawdata).symbolsList;
    console.log(symbols);
    res.send(symbols)
});


router.get("/api/symbols/:symbol", (req, res) => {
    let rawdata = fs.readFileSync('./source/symbols.json');
    let symbols = JSON.parse(rawdata).symbolsList;
    const items = symbols.filter(item => item.symbol === req.params.symbol);
    res.send(items);  
});


router.get("/api/historical/", (req, res) => {
    let rawdata = fs.readFileSync('./source/historical.json');
    let historical = JSON.parse(rawdata).historicalStockList;
    res.send(historical);
});


router.get("/api/historical/:symbol", (req, res) => {
    let rawdata = fs.readFileSync('./source/historical.json');
    let historical = JSON.parse(rawdata).historicalStockList;
    const items = historical.filter(item => item.symbol === req.params.symbol);
    //console.log(items);
    res.send(items);    
});


app.listen(9090);
console.log("la aplicacion está escuchando en http://localhost:9090");


const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:8888' + pedido.url)
    let camino = 'static' + url.pathname
    if (camino == 'static/')
      camino = 'static/index.html'
    fs.stat(camino, error => {
      if (!error) {
        fs.readFile(camino, (error, contenido) => {
          if (error) {
            respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
            respuesta.write('Error interno')
            respuesta.end()
          } else {
            respuesta.writeHead(200, { 'Content-Type': 'text/html' })
            respuesta.write(contenido)
            respuesta.end()
          }
        })
      } else {
        respuesta.writeHead(404, { 'Content-Type': 'text/html' })
        respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
        respuesta.end()
      }
    })
  })
  
  servidor.listen(8888)