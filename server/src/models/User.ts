import {BuildOptions, DATE, Model, STRING, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";

class User extends Model {
    public id!: string;
    public userName!: string;
    public passwordHash!: string;
    public email!: string;
    public deletedAt!: Date;
    static associate(models: any) {
        User.hasMany(models.Story, {
            foreignKey: 'ownerId',
        })
        // User may have created multiple tasks
        User.hasMany(models.Task, {
            foreignKey: 'ownerId',
        })
        User.belongsToMany(models.Story, {
            through: models.UserStory,
            foreignKey: 'userId',
        })
        // User may be working on multiple tasks
        User.belongsToMany(models.Task, {
            through: models.UserTask,
            foreignKey: 'userId',
        })
        // user may be working on multiple subtasks
        User.belongsToMany(models.Subtask, {
            through: models.UserSubtask,
            foreignKey: 'userId',
        })
        User.belongsToMany(models.Project, {
            through: models.Project,
            foreignKey: 'id',
        })
        
    }
}

User.init({
    id: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
    },
    userName: STRING,
    passwordHash: STRING,
    email: STRING,
    deletedAt: DATE,
    projectId: STRING
}, {
    sequelize,
    modelName: 'User',
});
/*
User.hasMany(Story, {
    foreignKey: 'ownerId',
})
// User may have created multiple tasks
User.hasMany(Task, {
    foreignKey: 'ownerId',
})
User.belongsToMany(Story, {
    through: UserStory,
    foreignKey: 'userId',
})
// User may be working on multiple tasks
User.belongsToMany(Task, {
    through: UserTask,
    foreignKey: 'userId',
})
// user may be working on multiple subtasks
User.belongsToMany(Subtask, {
    through: UserSubtask,
    foreignKey: 'userId',
})*/

export type UserModelStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): User
}

export default User as UserModelStatic



/*
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /!**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *!/
    static associate(models) {
      User.hasMany(models.Story, {
        foreignKey: 'ownerId',
    })
    // User may have created multiple tasks
    User.hasMany(models.Task, {
        foreignKey: 'ownerId',
    })
    User.belongsToMany(models.Story, {
        through: models.UserStory,
        foreignKey: 'userId',
    })
    // User may be working on multiple tasks
    User.belongsToMany(models.Task, {
        through: models.UserTask,
        foreignKey: 'userId',
    })
    // user may be working on multiple subtasks
    User.belongsToMany(models.Subtask, {
        through: models.UserSubtask,
        foreignKey: 'userId',
    })
    }
  };
  User.init({
    userName: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};*/
