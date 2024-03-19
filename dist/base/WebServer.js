"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_decorators_1 = require("fastify-decorators");
const path_1 = require("path");
const Main_1 = __importDefault(require("../Main"));
class WebServer {
    constructor(option) {
        var _a;
        this.port = option.port;
        this.server = (0, fastify_1.default)({ logger: true });
        this.middlewares = (_a = option.middlewares) !== null && _a !== void 0 ? _a : [];
    }
    start() {
        return new Promise((success) => {
            this.middlewares.forEach((middleware) => {
                this.server.register(middleware.import, middleware.config);
            });
            this.server.register(fastify_decorators_1.bootstrap, {
                // Specify directory with our controllers
                directory: (0, path_1.resolve)(__dirname, "..", `controllers`),
                // Specify mask to match only our controllers
                mask: /Controller\./,
            });
            this.server.listen({ port: this.port, host: '0.0.0.0' }, (err, address) => {
                if (err)
                    throw err;
                Main_1.default.getLogger().info("The server was successfully started on : " + address);
                success();
            });
        });
    }
    addMiddleware(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    getServer() {
        return this.server;
    }
}
exports.default = WebServer;
