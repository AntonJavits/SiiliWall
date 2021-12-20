import { AWSError } from "aws-sdk";

export const errorHandler = (err: AWSError) => {
    if (err) {
        console.error(err);
    }
};
