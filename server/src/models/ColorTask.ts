import {BuildOptions, Model, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Color from "./Color";
import Task from "./Task";

class ColorTask extends Model {
  public colorId!: string;
  public taskId!: string;

  static associate(models: any) {
    ColorTask.belongsTo(models.Task, { foreignKey: 'taskId', targetKey: 'id', onDelete: 'cascade' })
    ColorTask.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', onDelete: 'cascade' })
  }
}

ColorTask.init({
  colorId: {
    type: UUID,
    references: {
      model: Color,
      key: 'id',
    },
    primaryKey: true,
  },
  taskId: {
    type: UUID,
    references: {
      model: Task,
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'ColorTask',
});

export type ColorTaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): ColorTask
}

export default ColorTask as ColorTaskModelStatic

/*

module.exports = (sequelize, DataTypes) => {
  class ColorTask extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      ColorTask.belongsTo(models.Task, { foreignKey: 'taskId', targetKey: 'id', onDelete: 'cascade' })
      ColorTask.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', onDelete: 'cascade' })
    }
  };
  ColorTask.init({
    colorId: DataTypes.UUID,
    taskId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ColorTask',
  });
  return ColorTask;
};*/
