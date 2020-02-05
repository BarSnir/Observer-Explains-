const express = require('express');
const userGenerator = require('../src/datasource/UserGenerator').modules;
const userList = [
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

setInterval(addUser,2000);

function addUser() {

    if(userPosition === userList.length){
        process.exit(0);
    }
    userGenerator.addUserEvent(userList[userPosition]);
    userPosition++;
}

const app = express()
const port = 4000
// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))