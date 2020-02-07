const WebSocketClient = require('../DataSource/WebSocketClient').modules

exports.modules = {
    webSocketClient: WebSocketClient,
    emitUser(name, action) {
        this.webSocketClient.emit('USER',{
            "title": `${name} ${action}`,
        });
    },
    emitMessage(message) {
        this.webSocketClient.emit('MESSAGE',{
            "message": message,
        });
    }
}