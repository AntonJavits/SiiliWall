import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Tasks', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    prettyId: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    columnOrderNumber: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    swimlaneOrderNumber: {
      type: DataTypes.INTEGER
    },
    storyPoints: {
      type: DataTypes.STRING
    },
    spentStoryPoints: {
      type: DataTypes.STRING
    },
    difficulty: {
      type: DataTypes.INTEGER
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
  await sequelize.getQueryInterface().dropTable('Tasks');
};
