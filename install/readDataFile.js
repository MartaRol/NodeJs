"use strict"

const fs = require('fs');

function readDataFile(nameFile, callback) {
    const file = ("./install/" + nameFile);
    let dataJson ={};

    fs.readFile(file, (err, data) => {
        if (err) {
            return callback (err);
        }

        try{
            dataJson = JSON.parse(data);
        }catch (err){
            return callback(err);
        }

        callback (null, dataJson);
    });
}

module.exports = readDataFile;