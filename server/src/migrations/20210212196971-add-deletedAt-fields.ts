import { DataTypes } from 'sequelize';
import { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn('Projects',
        'deletedAt',
        {
            type: DataTypes.DATE,
            allowNull: true,
        })

};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn('Projects', 'deletedAt');
};
