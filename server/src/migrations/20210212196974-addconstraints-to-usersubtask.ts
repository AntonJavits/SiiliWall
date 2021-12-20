import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('UserSubtasks', {
        fields: ['userId'],
        name: "fk_user_subtask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('UserSubtasks', {
        fields: ['subtaskId'],
        name: "fk_user_subtask_id_2",
        type: 'foreign key',
        references: { //Required field
            table: 'Subtasks',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('UserSubtasks', 'subtaskId');
    await sequelize.getQueryInterface().removeColumn('UserSubtasks', 'userId');
};
