const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const fs = require("fs");

const filePath = "Bd.json";
const User = require("../models/user").user;

const isValidPassword = function(user, password) {
    return bcrypt.compareSync(password, user.password);
}

router.post('/registration', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log('rego');
    let data = fs.readFileSync(filePath, "utf8");
    let bd = JSON.parse(data);
    for (var i = 0; i < bd.length; i++) {
        if (bd[i].email == req.body.email) {
            return res.status(401).json({
                message: "Логин уже существует"
            });
        }
    }
    if(req.body.password === req.body.repeatPassword) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            console.log('bcrypt');
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: "Ошибка хеширования"
                });
            } else {
                const user = new User({ name: req.body.name, email: req.body.email, password: hash });
                bd.push(user);
                data = JSON.stringify(bd);

                fs.writeFileSync("Bd.json", data);
                res.send(user);
            }
        });

    } else {
        return res.status(401).json({
            message: "Пароли не совпадают!"
        });
    }
})

router.post('/login', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log('login');
    const content = fs.readFileSync(filePath, "utf8");
    const bd = JSON.parse(content);
    let one = null;
    for(var i = 0; i < bd.length; i++) {
        if (bd[i].email == req.body.email) {
            bcrypt.compare(req.body.password, bd[i].password, (err, result) => {
                console.log('bcrypt');
                if (err) {
                    return res.status(401).json({
                        message: "Не удалось выполнить вход"
                    });
                }
                if (result) {
                    one = bd[i];
                    res.send(one);
                } else {
                    return res.status(401).json({
                        message: "Не правильный пароль!"
                    });
                }
            });
            break;
        }
    }
    // if(!one) {
    //     return res.status(402).json({
    //         message: "Не правильный  логин!"
    //     });
    // }
})

router.post('/myData', (req, res, next) => {
    if (!req.body) return res.sendStatus(400);
    console.log('data');
    let data = fs.readFileSync(filePath, "utf8");
    let bd = JSON.parse(data);
    for (var i = 0; i < bd.length; i++) {
        if (bd[i].email == req.body.email) {
            let data = JSON.stringify(bd[i]);
            res.send(data);
        }
    }

})

module.exports.fs = fs;
module.exports.router = router;

