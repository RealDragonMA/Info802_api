import AbstractRoute from "../AbstractRoute";
import {FastifyReply, FastifyRequest} from "fastify";
import Main from "../../Main";
import {Client} from "@urql/core";
import {getVehicleDetailsQuery} from "../../queries/GetVehicleQuery";

export default class GetVehicleRoute extends AbstractRoute {

    run = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {

        const options = <{ id: string }>req.params;

        const client: Client | undefined = Main.getChargeTrip().get();
        if (!client) {
            return reply.code(500).send({
                statusCode: 500,
                error: "Internal server error, client not defined !"
            })
        }

        const vehicle = await client.query(getVehicleDetailsQuery, {vehicleId: options.id}).toPromise();

        console.log(vehicle);

        return reply.code(200).send(vehicle.data)

    }

}