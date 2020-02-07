const importedUsers = require('../userList').userList;
const UserEvents = require('../DataSource/UserEvents').modules;
const Observables = require('../Observables/UserObservable').modules;
const UserRepo = require('../Repositories/UserRepo').modules;
const WebSocketClient = require('../DataSource/WebSocketClient').modules;


class UserController {
    constructor() {
        this.userPosition = 0;
        this.userList = Object.assign(importedUsers, []);
        this.userEvents = UserEvents;
        this.userRepo = UserRepo;
        this.webSocketClient = WebSocketClient;
    }

    addUsers(req, res, next) {
        const addEventInterval = setInterval(()=>{
            this.userEvents.addUserEvent(this.userList[this.userPosition]);
            this.userRepo.emitUser(this.userList[this.userPosition], this.userEvents.actionDisplay);
            for (let observer in Observables.observerList) {
                this.userRepo.emitMessage(Observables.observerList[observer].userMessage)
            }
            this.userPosition++;
            if(this.userPosition === this.userList.length){
                clearInterval(addEventInterval);
                res.end();
                return;
            }
        },2000); 
    }

    removeUsers(req, res, next) {
        const removeEventInterval = setInterval(()=> {
            this.userEvents.removeUserEvent(this.userList[this.userList.length-1]);
            this.userRepo.emitUser(this.userList[this.userList.length-1], this.userEvents.actionDisplay);
            this.userList.pop();
            for (let observer in Observables.observerList) {
                this.userRepo.emitMessage(Observables.observerList[observer].userMessage)
            }
            this.userPosition++;
            if(!this.userList.length){
                clearInterval(removeEventInterval);
                res.end();
                return;
            }
        },2000);
    }
}
exports.UserController = new UserController();