class UserObserver {
    constructor(username){
        this.username = username;
    }

    update(newUser) {
        console.log(`Hi from ${this.username} to ${newUser}`); 
    }
}

exports.modules = UserObserver;