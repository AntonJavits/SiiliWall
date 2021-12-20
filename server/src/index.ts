import {expressApp, ServerType} from "./express";
import {ApolloServer} from 'apollo-server-express';
import * as http from "http";
import {execute, subscribe} from 'graphql';
import {applyMiddleware} from 'graphql-middleware';
import express from 'express';
import {createContext} from "./context";
import {SubscriptionServer} from "subscriptions-transport-ws";

const { makeExecutableSchema } = require('graphql-tools')
const config = require('./utils/config')
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const env = process.env.NODE_ENV

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers: resolvers,
    }),
);

const createApolloServer = (): ApolloServer => new ApolloServer({
    schema,
    context: createContext,
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    subscriptions: {
        onConnect: (): void => {
            process.stdout.write('Connected to websocket\n');
        },
        onDisconnect: (): void => {
            process.stdout.write('Disconnected from websocket\n');
        },

    },
});


const initializeApolloServer = (apollo: ApolloServer, app: express.Application) => {
    apollo.applyMiddleware({ app });

    return (): void => {
        process.stdout.write(
            `🚀 Server ready at http://localhost:${config.PORT}${apollo.graphqlPath}\n`,
        );
    };
};

const WS_PORT = process.env.WS_PORT || 5000;

const startSubscriptionServer = async (app: express.Application) => {
    // Create WebSocket listener server
    const websocketServer = http.createServer(app);

    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () => console.log(
        `Websocket Server is now running on ws://localhost:${WS_PORT}`
    ));

    SubscriptionServer.create({
        execute,
        subscribe,
        schema,
    }, {
        server: websocketServer,
        path: '/subscriptions'
    })
}


export const startServer = async (app: express.Application) => {
    const httpServer = http.createServer(app)

    const apollo = createApolloServer();
    apollo.installSubscriptionHandlers(httpServer);
    const handleApolloServerInitialized = initializeApolloServer(apollo, app);


    return httpServer.listen({ port: config.PORT }, () => {
        handleApolloServerInitialized()
        console.log(process.memoryUsage());

    })
}

if (env !== 'test') {
    if (env === 'production') {
        const service = process.env.SERVICE;
        if (service === 'backend') {
            const app = expressApp(ServerType.httpServer)
            startServer(app).catch(e => console.log(`subscription server start failed: ${e}`))
        } else {
            startSubscriptionServer(expressApp(ServerType.wsServer)).catch(e => console.log(`subscription server start failed: ${e}`))
        }
    } else {
        const app = expressApp(ServerType.httpServer)
        startServer(app).catch(e => console.log(`subscription server start failed: ${e}`))
        startSubscriptionServer(expressApp(ServerType.wsServer)).catch(e => console.log(`subscription server start failed: ${e}`))
    }
}


// apollo.applyMiddleware({ app: app })
//
// apollo.installSubscriptionHandlers(app)
//
// app.listen({ port: config.PORT }, () => {
//     console.log(`Server running on port ${config.PORT}/${apollo.graphqlPath}`)
//     new SubscriptionServer({
//         execute,
//         subscribe,
//         schema,
//     }, {
//         server,
//         path: '/graphql',
//     })
// })
//
// server.close()

