import {DataTypes, STRING} from 'sequelize';
import {Migration} from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Subtasks', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
    },
    prettyId: {
      type: STRING,
      allowNull: false,
    },
    columnOrderNumber: {
      type: DataTypes.INTEGER
    },
    done: {
      type: DataTypes.BOOLEAN
    },
    name: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    storyPoints: {
      type: DataTypes.STRING
    },
    spentStoryPoints: {
      type: DataTypes.STRING
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
  await sequelize.getQueryInterface().dropTable('Subtasks');
};
