const userObservable = require('../Observables/UserObservable').modules;

class UserGenerator {
    constructor(){
        this.userObservable = userObservable;
    }
    addUserEvent(user) {
        this.userObservable.addObserver(user);
        this.userObservable.notifyObservers(user);
    }
}

exports.modules = new UserGenerator();