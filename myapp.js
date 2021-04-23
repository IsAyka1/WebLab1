const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index.js');
const router = index.router;
//import { router } from './routes/index.js';
//import express from 'express';
//import bodyParser from 'body-parser';
const app = express();

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/page/index.html');
});

app.get('/authorizationPage', function(req, res) {
    res.sendFile(__dirname + '/page/authorizationPage.html');
});

app.get('/registrationPage', function(req, res) {
    res.sendFile(__dirname + '/page/registrationPage.html');
});

app.get('/user', function (req, res) {
    res.sendFile(__dirname + '/page/user.html');
});

app.use(function(req, res, next){
    const err = new Error('Ничего не найдено!');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })
});

const server = app.listen(PORT, function () {
    console.log('Сервер на порту: ' + server.address().port);
});

