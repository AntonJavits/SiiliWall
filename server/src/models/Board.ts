import { BuildOptions, Model, STRING, INTEGER, UUID, DATE } from "sequelize";
import { dbConfig as sequelize } from "../database";
import Project from "./Project";
import User from "./User";

class Board extends Model {
  public id!: string;
  public prettyId!: string;
  public ticketCount!: number;
  public name!: string;
  public orderNumber!: number;
  public projectId!: string;
  public creatorId!: string;
  public deletedAt!: Date;
  static associate(models: any) {
    Board.hasMany(models.Column, {
      foreignKey: "boardId",
    });
    // Board has one creator user
    Board.belongsTo(models.User, {
      foreignKey: "creatorId",
    });
    Board.hasMany(models.Story, {
      foreignKey: "boardId",
    });
    Board.hasMany(models.Task, {
      foreignKey: "boardId",
    });
    Board.belongsTo(models.Project, {
      foreignKey: "projectId",
    });
  }
}

Board.init(
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
    ticketCount: INTEGER,
    name: {
      type: STRING,
      allowNull: false,
    },
    orderNumber: {
      type: INTEGER,
      allowNull: false,
    },
    projectId: {
      type: UUID,
      references: {
        model: Project,
        key: "id",
      },
    },
    creatorId: {
      type: UUID,
      references: {
        model: User,
        key: "id",
      },
    },
    deletedAt: DATE,
  },
  {
    sequelize,
    modelName: "Board",
  }
);

export type BoardModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Board;
};

export default Board as BoardModelStatic;

/*
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      Board.hasMany(models.Column, {
        foreignKey: 'boardId',
    })
    // Board has one creator user
    Board.belongsTo(models.User, {
        foreignKey: 'creatorId',
    })
    Board.hasMany(models.Story, {
        foreignKey: 'boardId',
    })
    Board.hasMany(models.Task, {
        foreignKey: 'boardId',
    })
    Board.belongsTo(models.Project, {
        foreignKey: 'projectId'
    })
    }
  };
  Board.init({
    prettyId: DataTypes.STRING,
    ticketCount: DataTypes.INTEGER,
    name: DataTypes.STRING,
    orderNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};*/
