const importedUsers = require('../userList').userList;
const UserEvents = require('../DataSource/UserEvents').modules;
const Observables = require('../Observables/UserObservable').modules;
const UserRepo = require('../Repositories/UserRepo').modules;

class UserService {
    constructor() {
        this.userPosition = 0;
        this.userList = Object.assign(importedUsers, []);
        this.userEvents = UserEvents;
        this.userRepo = UserRepo;
    }

    addUsers() {
        this.userEvents.addUserEvent(this.userList[this.userPosition]);
        this.userRepo.emitUser(this.userList[this.userPosition], this.userEvents.actionDisplay);
        for (let observer in Observables.observerList) {
            this.userRepo.emitMessage(Observables.observerList[observer].userMessage)
        }
        this.userPosition++;
        return this.userPosition === this.userList.length;
    }

    removeUsers() {
        this.userEvents.removeUserEvent(this.userList[this.userList.length-1]);
        this.userRepo.emitUser(this.userList[this.userList.length-1], this.userEvents.actionDisplay);
        this.userList.pop();
        for (let observer in Observables.observerList) {
            this.userRepo.emitMessage(Observables.observerList[observer].userMessage)
        }
        return !this.userList.length;
    }

}

exports.modules = new UserService();