import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('UserTasks', {
        fields: ['userId'],
        name: "fk_user_usertask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Users',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('UserTasks', {
        fields: ['taskId'],
        name: "fk_task_usertask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Tasks',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })


};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('UserTasks', 'taskId');
    await sequelize.getQueryInterface().removeColumn('UserTasks', 'userId');
};
