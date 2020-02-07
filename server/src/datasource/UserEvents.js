const userObservable = require('../Observables/UserObservable').modules;

class UserEvents {

    constructor() {
        this.actionDisplay = null;
        this.joinedAction = "has joined the chat";
        this.leftAction = "has left the chat"
        this.userObservable = userObservable;
    }

    addUserEvent(user) {
        const action = "add";
        this.userObservable.addObserver(user);
        this.userObservable.notifyObservers(user, action);
        this.actionDisplay = this.joinedAction;
    }

    removeUserEvent(user) {
        const action = "remove";
        this.userObservable.removeObserver(user);
        this.userObservable.notifyObservers(user, action);
        this.actionDisplay = this.leftAction;
    }
}

exports.modules = new UserEvents();