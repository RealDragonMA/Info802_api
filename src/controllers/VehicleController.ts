import {Controller, GET} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import GetVehiclesRoute from "../routes/vehicles/GetVehiclesRoute";

@Controller('/vehicle')
export default class VehicleController {

    @GET('/')
    public handlerGetVehicles = async (req: FastifyRequest, reply: FastifyReply) => new GetVehiclesRoute().run(req, reply);

}