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
class GetElectricStationsRoute extends AbstractRoute_1.default {
    constructor() {
        super(...arguments);
        this.run = (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { road } = req.body;
            const roadDivided = this.reducePathByDistance(road, 2);
            let electricStations = [];
            for (let i = 0; i < roadDivided.length; i++) {
                const [lng, lat] = roadDivided[i];
                const radius = 1000;
                const query = `within_distance(geo_point_borne, GEOM'POINT(${lng} ${lat})', ${radius}m)`;
                const url = `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?limit=1&where=${encodeURIComponent(query)}`;
                const stations = (yield axios_1.default.get(url)).data.results;
                stations.forEach((station) => {
                    const latBorne = station.geo_point_borne.lat;
                    const lngBorne = station.geo_point_borne.lon;
                    electricStations.push([latBorne, lngBorne]);
                });
            }
            return reply.code(200).send(electricStations);
        });
    }
    reducePathByDistance(path, distanceKm) {
        const R = 6371; // Rayon de la Terre en kilomètres
        let reducedPath = [path[0]];
        let totalDistance = 0;
        let previousPoint = path[0];
        path.forEach(point => {
            let dLat = this.deg2rad(point[0] - previousPoint[0]);
            let dLon = this.deg2rad(point[1] - previousPoint[1]);
            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(previousPoint[0])) * Math.cos(this.deg2rad(point[0])) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let distance = R * c; // Distance en kilomètres
            totalDistance += distance;
            if (totalDistance >= distanceKm) {
                reducedPath.push(point);
                totalDistance = 0;
            }
            previousPoint = point;
        });
        return reducedPath;
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
}
exports.default = GetElectricStationsRoute;
