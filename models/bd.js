const MongoClient = require('mongodb').MongoClient;
const url = "./Bd.json";
const baza = 'test';

module.exports.getUser = function(email) {
    return new Promise((resolve, reject)=>{
        MongoClient
            .connect(url, function(err, client){
                if (err) {
                    reject(err);
                }
                client
                    .db(baza)
                    .collection('users')
                    .find({ "email": email})
                    .toArray(function(err, results){
                        if (err) {
                            reject(err)
                        }
                        client.close();
                        resolve(results);
                    })
            })
    })
}

module.exports.getToken = function(token) {
    return new Promise((resolve, reject)=>{
        MongoClient
            .connect(url, function(err, client){
                if (err) {
                    reject(err);
                }
                client
                    .db(baza)
                    .collection('token')
                    .find({ "token": token})
                    .toArray(function(err, results){
                        if (err) {
                            reject(err)
                        }
                        client.close();
                        resolve(results);
                    })
            })
    })
}

module.exports.add = function(tabl, data) {
    return new Promise((resolve, reject) => {
        MongoClient
            .connect(url, function(err, client) {
                if (err) {
                    reject(err);
                }
                client
                    .db(baza)
                    .collection(tabl)
                    .insertOne(data, function(err, results){
                        if (err) {
                            reject(err);
                        }
                        client.close();
                        resolve(results.ops[0]);
                    })
            });
    })
}

module.exports.delete = function(email) {
    return new Promise((resolve, reject) => {
        //const id = new ObjectID(zadacaId);
        MongoClient
            .connect(url, function(err, client) {
                if (err) {
                    reject(err);
                }
                client
                    .db(baza)
                    .collection('token')
                    .deleteMany({ "login": email},
                        function(err, results){
                            if (err) {
                                reject(err);
                            }
                            client.close();
                            resolve(results);
                        })
            });
    })
}