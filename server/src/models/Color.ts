import {BuildOptions, Model, STRING, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";

class Color extends Model {
    public id!: string;
    public color!: string;

    static associate(models: any) {

        Color.belongsToMany(models.Task, {
            through: models.ColorTask,
            foreignKey: 'colorId',
        })
        Color.belongsToMany(models.Subtask, {
            through: models.ColorSubtask,
            foreignKey: 'colorId',
        })
    }
}

Color.init({
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
    },
    color: STRING,
}, {
    sequelize,
    modelName: 'Color'
})


export type ColorModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Color
}

export default Color as ColorModelStatic
/*

module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {

        Color.belongsToMany(models.Task, {
            through: models.ColorTask,
            foreignKey: 'colorId',
        })
        Color.belongsToMany(models.Subtask, {
            through: models.ColorSubtask,
            foreignKey: 'colorId',
        })
    }

  };
  Color.init({
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};
*/
