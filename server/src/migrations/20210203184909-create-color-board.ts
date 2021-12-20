import { DataTypes } from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('ColorBoards', {
    colorId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
  await sequelize.getQueryInterface().dropTable('ColorBoards');
};
