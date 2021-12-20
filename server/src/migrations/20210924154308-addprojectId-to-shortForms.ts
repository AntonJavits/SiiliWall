import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('ShortForms',
        'projectId',
        {
            type: DataTypes.UUID,
        })


    await sequelize.getQueryInterface().addConstraint('ShortForms', {
        fields: ['projectId'],
        name: "fk_project_id_sf",
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
    await sequelize.getQueryInterface().removeColumn('ShortForms', 'projectId');
};