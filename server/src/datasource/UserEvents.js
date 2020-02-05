const userObservable = require('../Observables/UserObservable').modules;

class UserEvents {

    constructor() {
        this.userObservable = userObservable;
    }

    addUserEvent(user) {
        const action = "add";
        this.userObservable.addObserver(user);
        this.userObservable.notifyObservers(user, action);
    }

    removeUserEvent(user) {
        const action = "remove";
        this.userObservable.removeObserver(user);
        this.userObservable.notifyObservers(user, action);
    }
}

exports.modules = new UserEvents();