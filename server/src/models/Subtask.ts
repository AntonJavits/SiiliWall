import {BuildOptions, Model, STRING, DATE, BOOLEAN, INTEGER, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";
import Column from "./Column";
import User from "./User";
import Task from "./Task";
import Board from "./Board";

class Subtask extends Model {
  public id!: string;
  public prettyId!: string;
  public columnOrderNumber!: number;
  public done!: boolean;
  public name!: string;
  public content!: string;
  public storyPoints!: string;
  public spentStoryPoints!: string;
  public deletedAt!: Date;
  public columnId!: string;
  public ownerId!: string;
  public taskId!: string;
  public boardId!: string;

  static associate(models: any) {
    Subtask.belongsTo(models.Board, {
      foreignKey: 'boardId',
    })
    Subtask.belongsTo(models.Task, {
      foreignKey: 'taskId',
    })
    Subtask.belongsTo(models.Column, {
      foreignKey: 'columnId',
    })
    // Subtask has one creator user
    Subtask.belongsTo(models.User, {
      foreignKey: 'ownerId',
    })
    // Subtask may have multiple users working on it
    Subtask.belongsToMany(models.User, {
      through: models.UserSubtask,
      foreignKey: 'subtaskId',
    })
    Subtask.belongsToMany(models.Color, {
      through: models.ColorSubtask,
      foreignKey: 'subtaskId',
    })
  }
}

Subtask.init({
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  prettyId: {
    type: STRING,
    allowNull: false,
  },
  columnOrderNumber: INTEGER,
  done: BOOLEAN,
  name: STRING,
  content: STRING,
  storyPoints: STRING,
  spentStoryPoints: STRING,
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
  },
  taskId: {
    type: UUID,
    references: {
      model: Task,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'Subtask',
});

export type SubtaskModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Subtask
}

export default Subtask as SubtaskModelStatic
