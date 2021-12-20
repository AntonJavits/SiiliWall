import {BuildOptions, Model, STRING, INTEGER, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Board from "./Board";

class Column extends Model {
  public id!: string;
  public name!: string;
  public orderNumber!: number;
  public boardId!: string;
  public hidden!: string;

  static associate(models: any) {
    Column.belongsTo(models.Board, {
      foreignKey: 'boardId',
    })
    Column.hasMany(models.Story, {
      foreignKey: 'columnId',
    })
    Column.hasMany(models.Task, {
      foreignKey: 'columnId',
    })
    Column.hasMany(models.Subtask, {
      foreignKey: 'columnId',
    })
  }
}

Column.init({
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: STRING,
  orderNumber: INTEGER,
  hidden: STRING,
  boardId: {
    type: UUID,
    references: {
      model: Board,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Column',
});

export type ColumnModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Column
}

export default Column as ColumnModelStatic



/*

module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      Column.belongsTo(models.Board, {
        foreignKey: 'boardId',
    })
    Column.hasMany(models.Story, {
        foreignKey: 'columnId',
    })
    Column.hasMany(models.Task, {
        foreignKey: 'columnId',
    })
    Column.hasMany(models.Subtask, {
        foreignKey: 'columnId',
    })
    }
  };
  Column.init({
    name: DataTypes.STRING,
    orderNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};*/
