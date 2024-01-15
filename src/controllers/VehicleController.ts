import {Controller, GET} from "fastify-decorators";
import {FastifyReply, FastifyRequest} from "fastify";
import GetVehiclesRoute from "../routes/vehicles/GetVehiclesRoute";
import S from "fluent-json-schema"
import GetVehicleRoute from "../routes/vehicles/GetVehicleRoute";

@Controller('/vehicle')
export default class VehicleController {

    @GET('/', {
        schema: {
            querystring: S.object()
                .prop('page', S.number().default(1))
                .prop('size', S.number().default(10))
                .prop('search', S.string().default(''))
                .prop('filter')
        }
    })
    public handlerGetVehicles = async (req: FastifyRequest, reply: FastifyReply) => new GetVehiclesRoute().run(req, reply);

    @GET('/:id', {
        schema: {
            params: S.object()
                .prop('id', S.string().required())
        }
    })
    public handlerGetVehicle = async (req: FastifyRequest, reply: FastifyReply) => new GetVehicleRoute().run(req, reply);

}