import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('UserStories', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    storyId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
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
  await sequelize.getQueryInterface().dropTable('UserStories');
};
