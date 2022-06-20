const { ApolloServer } = require('apollo-server-express');
import schema from "./schema";

import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";

const PORT = process.env.PORT;

async function startApolloServer(app: any) {
    const server = new ApolloServer({
        introspection: true,
        csrfPrevention: true,
        cache: 'bounded',
        cors: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req, res }: any) => {
            return {
                req,
                res,
            }
        },
        ...schema
    });
    await server.start();

    server.applyMiddleware({ app, path: "/api" });
    await new Promise<void>(resolve => app.listen({ port: PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

export default startApolloServer;
