const express = require('express');
var cors = require('cors')
const userEvents = require('../src/datasource/UserEvents').modules;
const Observables = require('./Observables/UserObservable').modules
const app = express();
const port = 4000;

const store = [
    "Chen",
    "Liran",
    "Hadar",
    "Ohad",
    "Roi",
    "Bar",
    "Rivka",
    "Moria",
]
let userPosition = 0;
let userList = [];


app.use(cors())

app.get('/addUsers', (req, res) =>{
    if(!userList.length) {
        userList = store;
    }
    
    const addEventInterval = setInterval(addUser,2000);
    function addUser() {
        if(userPosition === userList.length){
            clearInterval(addEventInterval);
            res.end();
            return;
        }
        userEvents.addUserEvent(userList[userPosition]);
        io.emit('USER',{
            "title": `${userList[userPosition]}  has joined the chat`,
        });
        for (let observer in Observables.observerList) {
            io.emit('MESSAGE',{
                "message":Observables.observerList[observer].userMessage,
            });
        }
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
        io.emit('USER',{
            "title": `${userList[userList.length-1]}  has left the chat`,
        });
        userList.pop();
        for (let observer in Observables.observerList) {
            io.emit('MESSAGE',{
                "message":Observables.observerList[observer].userMessage,
            });
        }
        userPosition++;
    }
});


const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

const io = require('socket.io')(server);