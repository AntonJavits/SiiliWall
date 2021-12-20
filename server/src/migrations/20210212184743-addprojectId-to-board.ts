import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Boards',
        'projectId',
        {
            type: DataTypes.UUID,
        })


    await sequelize.getQueryInterface().addConstraint('Boards', {
        fields: ['projectId'],
        name: "fk_project_id",
        type: 'foreign key',
        references: { //Required field
            table: 'Projects',
            field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })

};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('Boards', 'projectId');
};
