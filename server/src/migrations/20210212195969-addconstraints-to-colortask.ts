import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('ColorTasks', {
        fields: ['colorId'],
        name: "fk_color_colortask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Colors',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('ColorTasks', {
        fields: ['taskId'],
        name: "fk_task_colortask_id",
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
    await sequelize.getQueryInterface().removeColumn('ColorTasks', 'colorId');
    await sequelize.getQueryInterface().removeColumn('ColorTasks', 'taskId');
};
