const userObserver = require('../Observers/UserObserver').modules;

class UserObservable {
    constructor() {
        this.observerList = {};
    }

    addObserver(observerUsername){
        this.observerList[observerUsername] = new userObserver(observerUsername);
    }

    removeObserver(observerUsername){
        delete this.observerList[observerUsername];
    }

    notifyObservers(username, action){
        for (let observer in this.observerList) {
            let observerInstance = this.observerList[observer];
            if(observerInstance.username === username) {
                continue;
            }
            observerInstance.update(username, action);
        }
    }

}

exports.modules = new UserObservable();