const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const uuidv4 = require('uuid');

//const express = require("express");
const fs = require("fs");

//const app = express();
//const jsonParser = express.json();
const filePath = "Bd.json";
const User = require("../models/user");

//let auth = function(req, res, next) {
//    db
//        .getToken(req.headers.authorization)
//        .then((results)=>{
//            if (results.length == 0) {
//                const err = new Error('Не авторизован!');
//                err.status = 401;
//                next(err);
//            } else {
//                next()
//            }
//        })
//        .catch((err)=>{
//            next(err);
//        })
//}

const isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
}

// router.get('/', (req, res)=>{
//     res.json({
//         message: 'Добро пожаловать!'
//     })
// });

//router.get('/secret', auth, (req, res)=>{
//    res.json({
//        message: 'Секретная страница!'
//    })
//});

router.post('/registration', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log('rego');
    for (var i = 0; i < bd.length; i++) {
        if (bd[i].email == res.body.email) {
            return res.status(400).json({
                message: "Логин уже существует"
            });
        }
    }

    if(req.body.password === req.body.repeatPassword) {
        let data = fs.readFileSync(filePath, "utf8");
        let bd = JSON.parse(data);
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({ name: res.body.name, email: res.body.email, password: hash });
            }
        });

        bd.push(user);
        data = JSON.stringify(bd);

        fs.writeFileSync("Bd.json", data);
        res.send(user);
    } else {
        const err = new Error('Не совпадает пароль и подтверждение пароля!');
        err.status = 400;
        next(err);
    }
})

router.post('/login', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log('login');
    const content = fs.readFileSync(filePath, "utf8");
    const bd = JSON.parse(content);
    let one = null;
    for(var i = 0; i < bd.length; i++) {
        if (bd[i].email == res.body.email) {
            bcrypt.compare(req.body.password, bd[i].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Login failed"
                    });
                }
                if (result) {
                    one = bd[i];
                }
            });
            break;
        }
    }
    if(one) {
        res.send(one);
    }
    else {
        const err = new Error('Не правильный пароль или логин!');
        err.status = 404;
        next(err);
    }
})

module.exports = router;
