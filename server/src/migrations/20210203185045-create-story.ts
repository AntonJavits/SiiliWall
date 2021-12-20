import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Stories', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.DOUBLE
    },
    deletedAt: {
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('Stories');
};
