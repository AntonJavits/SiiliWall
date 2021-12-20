import express, {Application} from "express";
import {dbConfig} from "../database";
import boardsRouter from "../controllers/boards";
import {seeders} from "../seeder";
import {migrator} from "../umzug";

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const env = process.env.NODE_ENV || 'development'

export enum ServerType {
    httpServer,
    wsServer
}
export const expressApp = (serverType: ServerType): express.Application => {
    if (serverType === ServerType.httpServer) {
        dbConfig.authenticate().then(() => console.log("connected to db"))
            .catch(e => {
                throw e
            })

        if (env !== 'test') {
            migrator
                .up()
                .then(() => console.log("Migrations done"))
                .catch((e: any) => {
                    console.log("Error while migrating", e.toString())
                    throw e
                })
                .then(() => console.log("Running seeders to db"))
                .then(() => seeders
                    .up()
                    .catch((e: any) => {
                        console.log("Error while running seeders: ", e.toString())
                        throw e;
                    })
                    .then(() => console.log("Seeders done"))
                )
        }
    }

    const app: Application = express();
    if (env === "production") {
        app.use(require("helmet")());
        app.use(require("compression")());
        app.use('/health', require('express-healthcheck')())
        app.use(require("cors")());
        app.use(cookieParser());
    }
    app.use(bodyParser.json())
    if (serverType === ServerType.httpServer) {
        app.use('/graphql', bodyParser.json())
    }
    if (serverType === ServerType.wsServer) {
        app.use('/subscriptions', bodyParser.json())

    }
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

    app.use('/api/boards', boardsRouter)

    return app
};
