
const SocketIO = require('socket.io')

class Socket {
    constructor(server) {
        this.io = SocketIO(server)
        this.onServer();
    }

    onServer(){
        this.io.on("connection",(socket) =>{
            console.log("new connection");
            // const { idsocket } = socket.handshake.query;
            // socket.join(idsocket);
        })
    }
}
module.exports = Socket;