import AbstractRoute from "../AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";
import Main from "../../Main";
import {Client} from "@urql/core";
import {vehicleListQuery} from "../../queries/GetVehiclesQuery";

export default class GetVehiclesRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const {page, size, search} = <{page?: number, size?: number, search?: string}>req.query;

        const client: Client | undefined = Main.getChargeTrip().get();
        if(!client) {
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal server error, client not defined !"
            })
        }

        const vehicles = await client.query(vehicleListQuery, { page: page ?? 1, size: size ?? 10, search: search ?? '' }).toPromise();

        return reply.code(200).send(vehicles.data.vehicleList)

    }

}