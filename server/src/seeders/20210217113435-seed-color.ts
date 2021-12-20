import {Seeders} from "../seeder";

export const up: Seeders = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert('Colors', [{
        id: 'ca1b1793-e569-4fb3-8498-5a36406eeca6',
        color: 'yellow',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'f7606b69-3755-497b-9ed4-206ab0712198',
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3e679a60-ef5d-4fd7-ab2c-b147ee22d7ab',
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'adbb918c-de93-4a4c-8a1b-87af8afc2811',
        color: 'pink',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '55c528bb-6200-4614-8177-653149de7306',
        color: 'purple',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '4e935d81-665e-4efc-92b1-c22b05c5abd1',
        color: 'blue',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '516f1621-718b-4cda-9e2d-05f16c865ea8',
        color: 'black',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '9a965133-5817-42b3-8b3c-ce1c453e0b88',
        color: 'gray',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '99d0f5f1-6ff4-4e02-a564-fad8f3726c27',
        color: 'lightgrey',
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    ], {})

};
    export const down: Seeders = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('Colors', {})
    }

