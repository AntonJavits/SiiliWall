import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Users',
        'projectId',
        {
            type: DataTypes.UUID,
        })


    await sequelize.getQueryInterface().addConstraint('Users', {
        fields: ['projectId'],
        name: "fk_project_id_user",
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
    await sequelize.getQueryInterface().removeColumn('Users', 'projectId');
};
