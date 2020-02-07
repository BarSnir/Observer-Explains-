const UserService = require('../Services/UserService').modules

class UserController {
    constructor() {
        this.userService = UserService;
    }
    addUsers(req, res, next) {
        const addEventInterval = setInterval(()=>{
            if(this.userService.addUsers()){
                clearInterval(addEventInterval);
                res.end();
                return;
            }
        },2000); 
    }
    removeUsers(req, res, next) {
        const removeEventInterval = setInterval(()=> {
            if(this.userService.removeUsers()){
                clearInterval(removeEventInterval);
                res.end();
                return;
            }
        },2000);
    }
}
exports.UserController = new UserController();