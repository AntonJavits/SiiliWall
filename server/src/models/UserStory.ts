import {BuildOptions, Model, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import User from "./User";
import Story from "./Story";


class UserStory extends Model {
  public userId!: string;
  public storyId!: string;
  static associate(models: any) {
    UserStory.belongsTo(models.Story, {
      foreignKey: 'storyId',
      targetKey: 'id',
      onDelete: 'cascade'
    })
    UserStory.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'cascade'
    })
  }
}

UserStory.init({
  userId: {
    type: UUID,
    references: {
      model: User,
      key: 'id',
    },
    primaryKey: true,
  },
  storyId: {
    type: UUID,
    references: {
      model: Story,
      key: 'id',
    },
    primaryKey: true,

  },
}, {
  sequelize,
  modelName: 'UserStory',
});


export type UserStoryModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserStory
}

export default UserStory as UserStoryModelStatic



/*
module.exports = (sequelize, DataTypes) => {
  class UserStory extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      UserStory.belongsTo(models.Story, { foreignKey: 'storyId', targetKey: 'id', onDelete: 'cascade' })
        UserStory.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade' })
    }
  };
  UserStory.init({
    userId: DataTypes.UUID,
    storyId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UserStory',
  });
  return UserStory;
};*/
