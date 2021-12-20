import {BuildOptions, Model, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Subtask from "./Subtask";
import User from "./User";

class UserSubtask extends Model {
  public userId!: string;
  public subtaskId!: string;
  static associate(models: any) {
    UserSubtask.belongsTo(models.Subtask, { foreignKey: 'subtaskId', targetKey: 'id', onDelete: 'cascade' })
    UserSubtask.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade' })
  }
}

UserSubtask.init({
  userId: {
    type: UUID,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
  subtaskId: {
    type: UUID,
    references: {
      model: Subtask,
      key: 'id',
    },
    primaryKey: true,
  }
}, {
  sequelize,
  modelName: 'UserSubtask',
});

export type UserSubtaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserSubtask
}

export default UserSubtask as UserSubtaskModelStatic

/*

module.exports = (sequelize, DataTypes) => {
  class UserSubtask extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      UserSubtask.belongsTo(models.Subtask, { foreignKey: 'subtaskId', targetKey: 'id', onDelete: 'cascade' })
      UserSubtask.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade' })
    }
  };
  UserSubtask.init({
    userId: DataTypes.UUID,
    subtaskId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UserSubtask',
  });
  return UserSubtask;
};*/
