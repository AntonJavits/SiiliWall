import {BuildOptions, Model, STRING, INTEGER, UUID, DATE} from 'sequelize';
import { dbConfig as sequelize } from "../database";

class Project extends Model {
  public id!: string;
  public name!: string;
  public orderNumber!: number;
  public deletedAt!: Date;
    static associate(models: any) {
        Project.hasMany(models.Board, {
            foreignKey: 'boardId'
        })
    }
}

Project.init(
    {
        id: {
            type: UUID,
            allowNull: false,
            primaryKey: true,
        },
      name: {
        type: STRING,
        allowNull: false
      },
      orderNumber: {
        type: INTEGER,
        allowNull: false
      },
      deletedAt: DATE,
    },
    {
      sequelize,
      modelName: 'Project',
      timestamps: true,
      paranoid: false,
    }
)



export type ProjectModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Project
}

export default Project as ProjectModelStatic
/*
module.exports = (sequelize: any, datatypes: typeof DataTypes) => {
  const Project = sequelize.init({
    id: {
      type: datatypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: datatypes.STRING,
      allowNull: false
    },
    orderNumber: {
      type: datatypes.INTEGER,
      allowNull: false
    }
  },
  )
  Project.associate = (models: any) => {
    Project.hasMany(models.Board, {
      foreignKey: 'boardId'
    })
  }
  return Project
}
*/
