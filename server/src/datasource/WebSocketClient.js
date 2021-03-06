const ioInstance = require('socket.io');

class WebSocketClient {
    constructor() {
        this.wsServer = null;
    }
    setup(server) {
        this.wsServer = ioInstance(server);
    }
    emit(channel, msg) {
        this.wsServer.emit(channel, msg);
    }
}

exports.modules = new WebSocketClient();