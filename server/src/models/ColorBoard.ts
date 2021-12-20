import {BuildOptions, Model, STRING, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Board from "./Board";
import Color from "./Color";

class ColorBoard extends Model {
  public boardId!: string;
  public colorId!: string;
  public name!: string;

  static associate(models: any) {
    ColorBoard.belongsTo(models.Board, { foreignKey: 'boardId', targetKey: 'id', onDelete: 'cascade' })
    ColorBoard.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', onDelete: 'cascade' })
  }
}

ColorBoard.init({

  boardId: {
    type: UUID,
    references: {
      model: Board,
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
  },
  name: STRING
}, {
  sequelize,
  modelName: 'ColorBoard',
});

export type ColorBoardModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): ColorBoard
}

export default ColorBoard as ColorBoardModelStatic
