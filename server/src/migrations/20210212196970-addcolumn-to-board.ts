import { DataTypes } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("Boards", "deletedAt", {
    type: DataTypes.DATE,
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn("Boards", "deletedAt");
};
