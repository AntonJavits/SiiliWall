import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('UserTasks', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,    },
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
  await sequelize.getQueryInterface().dropTable('UserTasks');
};
