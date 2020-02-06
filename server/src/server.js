

const WebSocketClient = require('./DataSource/WebSocketClient').modules;
const Router = require('./Routes/router').modules;
const cors = require('cors');
const port = 4000;

exports.modules = {
    app: null,
    router: null,
    webSocketClient: null,
    server: null,
    serverMsg: `Observer demo app listening on port ${port}!`,
    setup(app){
        this.app = app;
        this.app.use(cors());
        this.setupRouter();
        this.app.use(this.router);
        return this;
    },
    run() {
        this.runWebSocket(this.runServer());
    },
    setupRouter() {
        Router.setupRoutes();
        this.router = Router.getRouter();
    },
    runWebSocket(server) {
        this.webSocketClient = WebSocketClient.setup(server);
        console.log('WebSocket IO is ready to use.');
        return this;
    },
    runServer() {
        return this.app.listen(port, () => {
            console.log(this.serverMsg);
        }); 
    }
}