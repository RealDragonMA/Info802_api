import {cacheExchange, Client, createClient, fetchExchange} from "@urql/core";

export default class ChargeTrip {

    private client: Client | undefined;


    public start() {

        this.client = createClient({
            url: 'https://api.chargetrip.io/graphql',
            fetchOptions: {
                method: 'POST',
                headers: {
                    'x-client-id': '659fbb1c03f11572e9c6a30a',
                    'x-app-id': '659fbb1c03f11572e9c6a30c',
                },
            },
            exchanges: [cacheExchange, fetchExchange]
        })

    }

    public get(): Client | undefined {
        return this.client;
    }

}
