import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Tasks',
        'columnId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Tasks',
        'boardId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Tasks',
        'ownerId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addConstraint('Tasks', {
        fields: ['boardId'],
        name: "fk_board_column_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Boards',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('Tasks', {
        fields: ['columnId'],
        name: "fk_column_id_2",
        type: 'foreign key',
        references: { //Required field
            table: 'Columns',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('Tasks', {
        fields: ['ownerId'],
        name: "fk_owner_id",
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
    await sequelize.getQueryInterface().removeColumn('Tasks', 'boardId');
    await sequelize.getQueryInterface().removeColumn('Tasks', 'ownerId');
    await sequelize.getQueryInterface().removeColumn('Tasks', 'columnId');
};
