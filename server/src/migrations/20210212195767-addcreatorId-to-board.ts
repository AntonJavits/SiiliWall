import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Boards',
        'creatorId',
        {
            type: DataTypes.UUID,
        })


    await sequelize.getQueryInterface().addConstraint('Boards', {
        fields: ['creatorId'],
        name: "fk_creator_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('Boards', 'creatorId');
};
