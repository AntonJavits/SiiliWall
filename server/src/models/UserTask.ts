import {BuildOptions, Model, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import User from "./User";
import Task from "./Task";

class UserTask extends Model {
  public userId!: string;
  public taskId!: string;

  static associate(models: any) {
    UserTask.belongsTo(models.Task, { foreignKey: 'taskId', targetKey: 'id', onDelete: 'cascade' })
    UserTask.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade' })
  }
}

UserTask.init({
  userId: {
    type: UUID,
    references: {
      model: User,
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
  }
}, {
  sequelize,
  modelName: 'UserTask',
});

export type UserTaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserTask
}

export default UserTask as UserTaskModelStatic


/*

module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      UserTask.belongsTo(models.Task, { foreignKey: 'taskId', targetKey: 'id', onDelete: 'cascade' })
      UserTask.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade' })
    }
  };
  UserTask.init({
    userId: DataTypes.UUID,
    taskId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};
*/
