const express = require('express');
const userEvents = require('../src/datasource/UserEvents').modules;
const userObservable = require('./Observables/UserObservable').modules;
const app = express();
const port = 4000;

let userPosition = 0;
let userList = [
    "Chen",
    "Liran",
    "Hadar",
    "Ohad",
    "Roi",
    "Bar",
    "Rivka",
    "Moria",
];


app.get('/addUsers', (req, res) =>{
    const addEventInterval = setInterval(addUser,2000);
    function addUser() {
        if(userPosition === userList.length){
            clearInterval(addEventInterval);
            res.end();
            return;
        }
        userEvents.addUserEvent(userList[userPosition]);
        userPosition++;
    }
});

app.get('/removeUsers', (req, res) => {
    const removeEventInterval = setInterval(removeUser,2000);
    function removeUser() {
        if(!userList.length){
            clearInterval(removeEventInterval);
            res.end();
            return;
        }
        userEvents.removeUserEvent(userList[userList.length-1]);
        userList.pop();
        userPosition++;
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))