import WebServer from "./base/WebServer";
import {Logger} from "tslog";
import ChargeTrip from "./base/ChargeTrip";

class Main {

    private readonly webserver: WebServer;
    private readonly chargeTrip: ChargeTrip;
    private readonly logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayFilePath: "hidden",
            displayFunctionName: false,
            prefix: ["RAPI |"],
            overwriteConsole: true,
            dateTimeTimezone: "Europe/Paris",
            dateTimePattern: "day/month/year hour:minute:second.millisecond",
        });

        this.webserver = new WebServer({
            port: 80,
            middlewares: [
                {
                    import: import("@fastify/cors"),
                    config: {
                        origin: "*",
                    },
                },
            ],
        });

        this.chargeTrip = new ChargeTrip();

    }

    public async start() {
        await this.webserver.start();
        this.chargeTrip.start();
    }

    public getWebServer(): WebServer {
        return this.webserver;
    }

    public getLogger(): Logger {
        return this.logger;
    }

    public getChargeTrip(): ChargeTrip {
        return this.chargeTrip;
    }

}

export default new Main();
