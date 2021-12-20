import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Columns',
        'boardId',
        {
            type: DataTypes.UUID,
        })





    await sequelize.getQueryInterface().addConstraint('Columns', {
        fields: ['boardId'],
        name: "fk_board_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Boards',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('Columns', 'boardId');
};
