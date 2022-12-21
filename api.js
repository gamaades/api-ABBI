const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const fs = require("fs");
const { send } = require("process");

var app = express(); 
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}))
app.use(router);

router.get("/api/symbols/", (req, res) => {
    let rawdata = fs.readFileSync('symbols.json');
    let symbols = JSON.parse(rawdata).symbolsList;
    if (req.query.symbol) {
        const items = symbols.filter(item => item.symbol === req.query.symbol);
        //console.log(items);
        res.send(items);    
    } else {
        res.send(symbols)
    }
});

router.get("/api/historical/", (req, res) => {
    let rawdata = fs.readFileSync('historical.json');
    let historical = JSON.parse(rawdata).historicalStockList;
    if (req.query.symbol) {
        const items = historical.filter(item => item.symbol === req.query.symbol);
        //console.log(items);
        res.send(items);    
    } else {
        res.send(historical)
    }
});

app.listen(9090);
console.log("la aplicacion está escuchando en http://localhost:9090");