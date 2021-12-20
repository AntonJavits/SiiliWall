import models, { ModelType } from './models';
import { SQSPubSub } from './subscriptions';
const { PubSub } = require('graphql-subscriptions')

const env = process.env.NODE_ENV
export const pubsub = env === 'production' ? new SQSPubSub({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || "eu-west-1",
        endpoint: process.env.QUEUE_URL
    })
    : new PubSub()

export interface MyContext {
    models: ModelType;
    pubsub: typeof PubSub | SQSPubSub;
}

export const createContext = (): MyContext => {
    return ({
        models,
        pubsub,
    });
};
