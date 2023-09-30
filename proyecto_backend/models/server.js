const express = require('express')
const cors = require('cors')
const Socket = require("./socket");
const http = require("http");
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        // this.luxandPath = '/api/luxand';
        this.chatgpt = '/api/chatgpt';
        this.vision = '/api/vision';
        this.auth = '/api/auth'
        this.reclamos = '/api/reclamos'
        this.funcionarios = '/api/funcionarios'
        this.users = '/api/users'
        this.categorias = '/api/categorias'
        this.estados = '/api/estados'
        this.areas = '/api/areas'
        //Middlewares
        this.middlewares();
        //socket
        this.ServerSocket();
        //rutas
        this.routes();
    }

    middlewares() {
        //CORS
        // this.app.use(cors())
        const whiteList = ['http://localhost:4200',
            'https://astounding-chebakia-00722d.netlify.app',
            'http://localhost:80',
            'http://localhost',
            'https://mi-first-web-domeki.000webhostapp.com',
            'http://127.0.0.1:5500'];
        this.app.use(cors({
            origin: whiteList
        }))
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.luxandPath, require('../routes/luxand'));
        this.app.use(this.auth, require('../routes/auth'));
        this.app.use(this.chatgpt, require('../routes/chatgpt'));
        this.app.use(this.vision, require('../routes/vision'));
        this.app.use(this.reclamos, require('../routes/reclamos'));
        this.app.use(this.funcionarios, require('../routes/funcionarios'));
        this.app.use(this.users, require('../routes/user'));
        this.app.use(this.categorias, require('../routes/categorias'));
        this.app.use(this.estados, require('../routes/estados'));
        this.app.use(this.areas, require('../routes/areas'));
    }
    ServerSocket() {
        new Socket(this.server)
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server
