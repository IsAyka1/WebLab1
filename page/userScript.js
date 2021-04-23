
//import fs from 'fs';
//const fs = require('../routes/index.js').fs;
let userEmail = location.search;
userEmail = userEmail.substring(userEmail.indexOf("=")+1);
const filePath = "Bd.json";
//let data = fs.readFileSync(filePath, "utf8");
let  data = require("../Bd.json");
let bd = JSON.parse(data);

for (var i = 0; i < bd.length; i++) {
    if (bd[i].email == userEmail) {
        //user = bd[i];
        const form = document.forms["userForm"];
        form.elements["name"].value = bd[i].name;
        form.elements["email"].value = bd[i].email;
        form.elements["password"].value = bd[i].password;
        break;
    }
}