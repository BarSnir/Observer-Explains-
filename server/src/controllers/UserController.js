const importedUsers = require('../userList').userList;
const userEvents = require('../datasource/UserEvents').modules;
const Observables = require('../Observables/UserObservable').modules;


class UserController {
    constructor(){

        let userPosition = 0;
        let userList = [];
    }
    addUsers() {
        if(!userList.length) {
            userList = store;
        }
        
        const addEventInterval = setInterval(addUser,2000); 
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

    removeUsers() {
        if(!userList.length){
            clearInterval(removeEventInterval);
            res.end();
            return;
        }
        const removeEventInterval = setInterval(removeUser,2000);
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
}

exports.UserController = new UserController();