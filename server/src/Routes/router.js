var express = require('express')
const UserController = require('../controllers/UserController').UserController;

exports.modules = {
    router: express.Router(),
    setupRoutes() {
        this.router.get('/addUsers', [], UserController.addUsers.bind(UserController))
        this.router.get('/removeUsers', [], UserController.removeUsers.bind(UserController))
    },
    getRouter() {
        return this.router;
    }
}