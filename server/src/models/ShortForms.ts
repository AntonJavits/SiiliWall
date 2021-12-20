import { BuildOptions, Model, STRING, UUID } from "sequelize";
import { dbConfig as sequelize } from "../database";
import Project from "./Project";

class ShortForm extends Model {
  public id!: string;
  public prettyId!: string;
  public projectId!: string;
  static associate(models: any) {
    ShortForm.belongsTo(models.Project, {
        foreignKey: "projectId",
      });
  }
}

ShortForm.init(
  {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
    },
    prettyId: {
      type: STRING,
      allowNull: false,
    },
    projectId: {
      type: UUID,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ShortForms",
  }
);

export type ShortFormModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): ShortForm;
};

export default ShortForm as ShortFormModelStatic;
