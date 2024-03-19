import AbstractRoute from "../AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";
import axios from "axios";

export default class GetRoadRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {start, end} = <{ start: string, end: string }>req.query;

        console.log(start, end);

        const _start = start.split(',')
        const _end = end.split(',')

        let response = (await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: '5b3ce3597851110001cf6248c033c235cd58408988708d1c480a3049',
                start: `${_start[0]},${_start[1]}`,
                end: `${_end[0]},${_end[1]}`
            }
        })).data


        const road: [number, number][] = response.features.flatMap((feature: any) => feature.geometry.coordinates);
        const distance: number = Math.ceil(response.features[0].properties.summary.distance / 1000);

        return reply.code(200).send({
            road,
            distance,
            time: response.features[0].properties.summary.duration
        })

    }

}