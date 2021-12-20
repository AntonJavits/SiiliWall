import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Subtasks',
        'columnId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Subtasks',
        'ownerId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Subtasks',
        'taskId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addColumn('Subtasks',
        'boardId',
        {
            type: DataTypes.UUID,
        })

    await sequelize.getQueryInterface().addConstraint('Subtasks', {
        fields: ['boardId'],
        name: "fk_board_subtask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Boards',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


    await sequelize.getQueryInterface().addConstraint('Subtasks', {
        fields: ['taskId'],
        name: "fk_task_subtask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Tasks',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


    await sequelize.getQueryInterface().addConstraint('Subtasks', {
        fields: ['columnId'],
        name: "fk_column_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Columns',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('Subtasks', {
        fields: ['ownerId'],
        name: "fk_owner_id_2",
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
    await sequelize.getQueryInterface().removeColumn('Subtasks', 'columnId');
    await sequelize.getQueryInterface().removeColumn('Subtasks', 'ownerId');
    await sequelize.getQueryInterface().removeColumn('Subtasks', 'boardId');
    await sequelize.getQueryInterface().removeColumn('Subtasks', 'taskId');
};
