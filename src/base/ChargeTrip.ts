import {cacheExchange, Client, createClient, fetchExchange} from "@urql/core";
import fetch from "cross-fetch";


export default class ChargeTrip {

    private client: Client | undefined;


    public start() {

        this.client = createClient({
            url: 'https://api.chargetrip.io/graphql',
            fetchOptions: {
                method: 'POST',
                headers: {
                    'x-client-id': process.env["x-client-id"]!,
                    'x-app-id': process.env["x-app-id"]!
                },
            },
            fetch: fetch,
            exchanges: [cacheExchange, fetchExchange],
        })

    }

    public get(): Client | undefined {
        return this.client;
    }

}
