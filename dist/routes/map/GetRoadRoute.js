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
const axios_1 = __importDefault(require("axios"));
class GetRoadRoute extends AbstractRoute_1.default {
    constructor() {
        super(...arguments);
        this.run = (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { start, end } = req.query;
            console.log(start, end);
            const _start = start.split(',');
            const _end = end.split(',');
            let response = (yield axios_1.default.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
                params: {
                    api_key: '5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049',
                    start: `${_start[0]},${_start[1]}`,
                    end: `${_end[0]},${_end[1]}`
                }
            })).data;
            const road = response.features.flatMap((feature) => feature.geometry.coordinates);
            const distance = Math.ceil(response.features[0].properties.summary.distance / 1000);
            return reply.code(200).send({
                road,
                distance,
                time: response.features[0].properties.summary.duration
            });
        });
    }
}
exports.default = GetRoadRoute;
