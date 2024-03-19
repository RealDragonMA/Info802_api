"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractRoute_1 = __importDefault(require("../AbstractRoute"));
const Main_1 = __importDefault(require("../../Main"));
const GetVehicleQuery_1 = require("../../queries/GetVehicleQuery");
class GetVehicleRoute extends AbstractRoute_1.default {
    constructor() {
        super(...arguments);
        this.run = (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const options = req.params;
            const client = Main_1.default.getChargeTrip().get();
            if (!client) {
                return reply.code(500).send({
                    statusCode: 500,
                    error: "Internal server error, client not defined !"
                });
            }
            const vehicle = yield client.query(GetVehicleQuery_1.getVehicleDetailsQuery, { vehicleId: options.id }).toPromise();
            console.log(vehicle);
            return reply.code(200).send(vehicle.data);
        });
    }
}
exports.default = GetVehicleRoute;
