import {BuildOptions, Model, STRING, DATE, INTEGER, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Column from "./Column";
import User from "./User";
import Board from "./Board";

class Task extends Model {
  public id!: string;
  public prettyId!: string;
  public title!: string;
  public columnOrderNumber!: number;
  public description!: string;
  public swimlaneOrderNumber!: number;
  public storyPoints!: string;
  public spentStoryPoints!: string;
  public difficulty!: number;
  public deletedAt!: Date;
  public boardId!: string;
  public columnId!: string;
  public ownerId!: string;

  static associate(models: any) {
    Task.belongsTo(models.Column, {
      foreignKey: 'columnId',
    })
    Task.hasMany(models.Subtask, {
      foreignKey: 'taskId',
    })
    // Task has one creator user
    Task.belongsTo(models.User, {
      foreignKey: 'ownerId',
    })
    // Task may have multiple users working on it
    Task.belongsToMany(models.User, {
      through: models.UserTask,
      foreignKey: 'taskId',
    })
    Task.belongsToMany(models.Color, {
      through: models.ColorTask,
      foreignKey: 'taskId',
    })
    Task.belongsTo(models.Board, {
      foreignKey: 'boardId',
    })
  }
}

Task.init({
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  prettyId: STRING,
  title: STRING,
  columnOrderNumber: INTEGER,
  description: STRING,
  swimlaneOrderNumber: INTEGER,
  storyPoints: STRING,
  spentStoryPoints: STRING,
  difficulty: INTEGER,
  deletedAt: DATE,
  columnId: {
    type: UUID,
    references: {
      model: Column,
      key: 'id',
    }
  },
  ownerId: {
    type: UUID,
    references: {
      model: User,
      key: 'id',
    }
  },
  boardId: {
    type: UUID,
    references: {
      model: Board,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Task',
});

export type TaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Task
}

export default Task as TaskModelStatic
