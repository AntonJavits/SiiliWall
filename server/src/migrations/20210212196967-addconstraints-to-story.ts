import {Migration} from "../umzug";
import {DataTypes} from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {

    await sequelize.getQueryInterface().addColumn('Stories',
        'boardId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Stories',
        'columnId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Stories',
        'ownerId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addConstraint('Stories', {
        fields: ['columnId'],
        name: "fk_column_id_4",
        type: 'foreign key',
        references: { //Required field
            table: 'Columns',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('Stories', {
        fields: ['ownerId'],
        name: "fk_owner_id_4",
        type: 'foreign key',
        references: { //Required field
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('Stories', {
        fields: ['boardId'],
        name: "fk_board_id_4",
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
    await sequelize.getQueryInterface().removeColumn('Stories', 'columnId');
    await sequelize.getQueryInterface().removeColumn('Stories', 'ownerId');
    await sequelize.getQueryInterface().removeColumn('Stories', 'boardId');
};
