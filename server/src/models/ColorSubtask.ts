import {BuildOptions, Model, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Subtask from "./Subtask";
import Color from "./Color";

class ColorSubtask extends Model {
  public subtaskId!: string;
  public colorId!: string;

  static associate(models: any) {
    ColorSubtask.belongsTo(models.Subtask, { foreignKey: 'subtaskId', targetKey: 'id', onDelete: 'cascade' })
    ColorSubtask.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', onDelete: 'cascade' })
  }
}

ColorSubtask.init({

  subtaskId: {
    type: UUID,
    references: {
      model: Subtask,
      key: 'id',
    },
    primaryKey: true
  },
  colorId: {
    type: UUID,
    references: {
      model: Color,
      key: 'id',
    },
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'ColorSubtask',
});

export type ColorSubtaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): ColorSubtask
}

export default ColorSubtask as ColorSubtaskModelStatic

/*

module.exports = (sequelize, DataTypes) => {
  class ColorSubtask extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      ColorSubtask.belongsTo(models.Subtask, { foreignKey: 'subtaskId', targetKey: 'id', onDelete: 'cascade' })
      ColorSubtask.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', onDelete: 'cascade' })
    }
  };
  ColorSubtask.init({
    subtaskId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ColorSubtask',
  });
  return ColorSubtask;
};*/
