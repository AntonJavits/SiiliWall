import {
    ApolloClient, InMemoryCache, split, ApolloLink, createHttpLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

require('dotenv').config('../.env')

const backEndUri = process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_LOADBALANCER_HTTP_URI : 'http://localhost:4001/graphql';
const wsUri = process.env.REACT_APP_ENVIRONMENT === 'production' ? process.env.REACT_APP_LOADBALANCER_WS_URI : 'ws://localhost:5000/subscriptions';
// const httpLink = new HttpLink({
//     uri: backEndUri,
// })

const link = ApolloLink.from([
    createHttpLink({ uri: backEndUri, })
]);

const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
        reconnect: true,
    },
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
        )
    },
    wsLink,
    link,
)

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Board: {
                fields: {
                    columns: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                    columnOrder: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                    swimlaneOrder: {
                        merge(existing, incoming = []) {
                            return [...incoming]
                        },
                    },
                },
            },
            Column: {
                fields: {
                    tasks: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    subtasks: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    ticketOrder: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    taskOrder: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
            Task: {
                fields: {
                    members: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                    colors: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
            Subtask: {
                fields: {
                    colors: {
                        merge(existing, incoming) {
                            return [...incoming]
                        },
                    },
                },
            },
        },
    }),
})
