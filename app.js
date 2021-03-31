const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const filePath = "stuff.json";
app.get("/stuff", function(req, res){

    const content = fs.readFileSync(filePath,"utf8");
    const stuff = JSON.parse(content);
    res.send(stuff);
});
app.get("/stuff/:id", function(req, res){

    const id = req.params.id; // получаем id
    const content = fs.readFileSync(filePath, "utf8");
    const stuff = JSON.parse(content);
    let one = null;
    for(var i=0; i<stuff.length; i++){
        if(stuff[i].id==id){
            one = stuff[i];
            break;
        }
    }
    if(one){
        res.send(one);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/stuff", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const stuffName = req.body.name;
    const stuffPrice = req.body.price;
    let one = {name: stuffName, price: stuffPrice};

    let data = fs.readFileSync(filePath, "utf8");
    let stuff = JSON.parse(data);

    // находим максимальный id
    const id = Math.max.apply(Math,stuff.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    one.id = id+1;
    stuff.push(one);
    data = JSON.stringify(stuff);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("stuff.json", data);
    res.send(one);
});
app.delete("/stuff/:id", function(req, res){

    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let stuff = JSON.parse(data);
    let index = -1;
    for(var i=0; i < stuff.length; i++){
        if(stuff[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        const one = stuff.splice(index, 1)[0];
        data = JSON.stringify(stuff);
        fs.writeFileSync("stuff.json", data);
        res.send(one);
    }
    else{
        res.status(404).send();
    }
});

app.put("/stuff", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    const stuffId = req.body.id;
    const stuffName = req.body.name;
    const stuffPrice = req.body.price;

    let data = fs.readFileSync(filePath, "utf8");
    const stuff = JSON.parse(data);
    let one;
    for(var i=0; i<stuff.length; i++){
        if(stuff[i].id == stuffId){
            one = stuff[i];
            break;
        }
    }
    if(one){
        one.price = stuffPrice;
        one.name = stuffName;
        data = JSON.stringify(stuff);
        fs.writeFileSync("stuff.json", data);
        res.send(one);
    }
    else{
        res.status(404).send(one);
    }
});

app.get("/script.js", function (req, res) {
    res.sendFile(__dirname + "/script.js");
});

app.listen(9999, function(){
    console.log("Сервер ожидает подключения...");
});