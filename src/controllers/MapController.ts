import {Controller, GET, POST} from "fastify-decorators";
import S from "fluent-json-schema";
import GetRoadRoute from "../routes/map/GetRoadRoute";
import GetElectricStationsRoute from "../routes/map/GetElectricStationsRoute";

@Controller('/map')
export default class MapController {

    @GET('/road', {
        schema: {
            querystring: S.object()
                // Start will be an array with only 2 numbers, the lat and the lng [number, number]
                .prop('start', S.string().required())
                // End will be an array with only 2 numbers, the lat and the lng [number, number]
                .prop('end', S.string().required())
        }
    })
    public handlerGetRoad = async (req: any, reply: any) => new GetRoadRoute().run(req, reply);

    @POST('/electric-stations', {
        schema: {
            body: S.object()
                .prop('road', S.array().items(S.array().items(S.number())).required())
        }
    })
    public handlerGetElectricStations = async (req: any, reply: any) => new GetElectricStationsRoute().run(req, reply);

}