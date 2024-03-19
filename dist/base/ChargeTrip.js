"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@urql/core");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
class ChargeTrip {
    start() {
        this.client = (0, core_1.createClient)({
            url: 'https://api.chargetrip.io/graphql',
            fetchOptions: {
                method: 'POST',
                headers: {
                    'x-client-id': process.env["x-client-id"],
                    'x-app-id': process.env["x-app-id"]
                },
            },
            fetch: cross_fetch_1.default,
            exchanges: [core_1.cacheExchange, core_1.fetchExchange],
        });
    }
    get() {
        return this.client;
    }
}
exports.default = ChargeTrip;
