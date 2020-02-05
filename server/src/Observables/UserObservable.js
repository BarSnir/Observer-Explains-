const userObserver = require('../Observers/UserObserver').modules;

class UserObservable {
    constructor() {
        this.observerList = [];
    }

    addObserver(observerUsername){
        this.observerList.push(new userObserver(observerUsername));
    }

    removeObserver(observerUsername){
        let index = this.observerList.indexOf(observerUsername);
        this.observerList.splice(index, 1);
    }

    notifyObservers(username){
        for (let i = 0; i < this.observerList.length; i++) {
            if(this.observerList[i].username === username) {
                continue;
            }
            this.observerList[i].update(username);
        }
    }

}

exports.modules = new UserObservable();