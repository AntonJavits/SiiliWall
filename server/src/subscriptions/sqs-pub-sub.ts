import {PubSubEngine} from "graphql-subscriptions";
import aws, {SQS} from "aws-sdk";
import {PubSubAsyncIterator} from "graphql-subscriptions/dist/pubsub-async-iterator";
import { v4 as uuid } from 'uuid';
import {errorHandler} from "./utils";

const AWS_SDK_API_VERSION = "2012-11-05";
const PUB_SUB_MESSAGE_ATTRIBUTE = "SQSPubSubTriggerName";
const QUEUE_URL = process.env.QUEUE_URL;


export class SQSPubSub implements PubSubEngine {
    private sqs: SQS;

    private queueUrl = QUEUE_URL;
    private stopped!: boolean;
    // private triggerName!: string;

    public constructor(config: SQS.Types.ClientConfiguration = {}) {
        aws.config.update(config)
        this.sqs = new aws.SQS({ apiVersion: AWS_SDK_API_VERSION })
    }

    asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
        return new PubSubAsyncIterator<T>(this, triggers);
    }

    public publish = async (triggerName: string, payload: object) => {
        const params: SQS.Types.SendMessageRequest = {
            QueueUrl: this.queueUrl!!,
            MessageBody: JSON.stringify(payload),
            MessageGroupId: triggerName,
            MessageDeduplicationId: uuid(),
            MessageAttributes: {
                [PUB_SUB_MESSAGE_ATTRIBUTE]: {
                    DataType: "String",
                    StringValue: triggerName
                }
            }
        };
        const data = await this.sqs.sendMessage(params, errorHandler).promise();
        console.log(`Message ${data.MessageId} placed in the Queue: ${triggerName}`);
    }
    public subscribe = (
        triggerName: string,
        onMessage: Function
    ) => {
        try {
           this.poll(triggerName, onMessage);

            return Promise.resolve(1);
        } catch (error) {
            console.error(error);
        }
        return Promise.reject();
    };

    public unsubscribe = async (): Promise<void> => {
        if (!this.stopped) {
            this.stopped = true;

          /*  try {
                await this.deleteQueue();
            } catch (error) {
                console.error(error);
            }
*/
            this.stopped = false;
        }
    };

    private readonly poll = async (
        triggerName: string,
        onMessage: Function
    ): Promise<void> => {

        try {
            const params: SQS.ReceiveMessageRequest = {
                MessageAttributeNames: [PUB_SUB_MESSAGE_ATTRIBUTE],
                QueueUrl: this.queueUrl!,
                VisibilityTimeout: 20,
            };
            const data = await this.receiveMessage(params);
            const messages = data.Messages || [];
            messages.forEach((message: SQS.Message) => {
                console.log('Deleting Receipt:', message.ReceiptHandle)
                const deleteParams: SQS.DeleteMessageRequest = {
                    QueueUrl: this.queueUrl!!,
                    ReceiptHandle: message.ReceiptHandle!
                };
                if (message.MessageAttributes && message.MessageAttributes[PUB_SUB_MESSAGE_ATTRIBUTE]) {
                    this.sqs.deleteMessage(deleteParams, (err, data) => {
                        if (err) {
                            console.log("deleteMessage ERROR", err);

                        } else {
                            console.log("Message Deleted", data);

                        }
                    });
                }
            })
            messages.forEach((message: SQS.Message) => {
                console.log("parsing message: ", message)
                if (message.MessageAttributes &&
                    message.MessageAttributes[PUB_SUB_MESSAGE_ATTRIBUTE]
                    .StringValue === triggerName) {
                    if (message.Body) {
                        const parsedMessage = JSON.parse(message.Body)
                        console.log("parsedMessage: ", parsedMessage)
                        onMessage(parsedMessage)
                    }
                }
            })
            setImmediate( () => this.poll(triggerName, onMessage));
        } catch (e) {
            console.error(e)
        }
    };

    private readonly receiveMessage = async (
        params: SQS.Types.ReceiveMessageRequest
    ): Promise<SQS.Types.ReceiveMessageResult> => {
        try {
            return await this.sqs.receiveMessage(params, errorHandler).promise();
        } catch (error) {
            console.error(error);
        }
        return Promise.reject()
    }
    ;
}

export type CommonMessageHandler = (message: any) => any;
