class UserObserver {
    constructor(username){
        this.username = username;
        this.userMessage = "";
    }

    update(newUser, action) {
        const actionMessage = {
            "add":`Hi from ${this.username} to ${newUser}`,
            "remove" : `By from ${this.username} to ${newUser}`
        }
        this.userMessage = actionMessage[action];
    }
}

exports.modules = UserObserver;