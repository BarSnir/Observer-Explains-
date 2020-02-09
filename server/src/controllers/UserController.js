const UserService = require('../Services/UserService').modules

class UserController {
    constructor() {
        this.userService = UserService;
    }
    addUsers(req, res, next) {
        res.send(this.userService.addUsers()).end();
    }
    removeUsers(req, res, next) {
        res.send(this.userService.removeUsers()).end();
    }
}
exports.UserController = new UserController();