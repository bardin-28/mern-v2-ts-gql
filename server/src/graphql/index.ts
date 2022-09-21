const { ApolloServer } = require('apollo-server-express');
import schema from "./schema";
// @ts-ignore
import jwt from 'jsonwebtoken';

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
      // setHttpPlugin,
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    formatError: (err: any) => {
      // Don't give the specific errors to the client.
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }

      return err;
    },
    context: ({ req }: any) => {
      let token = req.headers.authorization.split(' ')[1] || '';

      let user = jwt.decode(token)

      return {
        user
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
