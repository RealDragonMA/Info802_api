import AbstractRoute from "../AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";
import axios from "axios";

export default class GetElectricStationsRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {road} = <{ road: [number, number][] }>req.body;

        const roadDivided = this.reducePathByDistance(road, 2);

        let electricStations: [number, number][] = [];

        for (let i = 0; i < roadDivided.length; i++) {

            const [lng, lat] = roadDivided[i];
            const radius = 1000;

            const query = `within_distance(geo_point_borne, GEOM'POINT(${lng} ${lat})', ${radius}m)`;
            const url = `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?limit=1&where=${encodeURIComponent(query)}`;

            const stations = (await axios.get(url)).data.results;

            stations.forEach((station: any) => {
                const latBorne = station.geo_point_borne.lat;
                const lngBorne = station.geo_point_borne.lon;
                electricStations.push([latBorne, lngBorne]);
            });
        }

        return reply.code(200).send(electricStations)

    }

    reducePathByDistance(path: [number, number][], distanceKm: number): [number, number][] {
        const R = 6371; // Rayon de la Terre en kilomètres
        let reducedPath: [number, number][] = [path[0]];
        let totalDistance = 0;
        let previousPoint = path[0];

        path.forEach(point => {
            let dLat = this.deg2rad(point[0] - previousPoint[0]);
            let dLon = this.deg2rad(point[1] - previousPoint[1]);
            let a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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

    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }


}