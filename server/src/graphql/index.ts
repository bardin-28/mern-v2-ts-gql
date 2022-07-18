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
        formatError: (err: any) => {
            // Don't give the specific errors to the client.
            if (err.message.startsWith('Database Error: ')) {
                return new Error('Internal server error');
            }

            // Otherwise return the original error. The error can also
            // be manipulated in other ways, as long as it's returned.
            return err;
        },
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
