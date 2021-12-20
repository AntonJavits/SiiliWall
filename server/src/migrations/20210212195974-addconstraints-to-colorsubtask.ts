import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addConstraint('ColorSubtasks', {
        fields: ['subtaskId'],
        name: "fk_subtask_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Subtasks',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

    await sequelize.getQueryInterface().addConstraint('ColorSubtasks', {
        fields: ['colorId'],
        name: "fk_color_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Colors',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('ColorSubtasks', 'colorId');
};
