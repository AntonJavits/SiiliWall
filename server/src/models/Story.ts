import {BuildOptions, Model, STRING, DOUBLE, DATE, UUID} from 'sequelize';
import { dbConfig as sequelize } from "../database";

class Story extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public color!: number;
  public size!: number;
  public deletedAt!: Date;
  public columnId!: string;
  public ownerId!: string;
  public boardId!: string;

  static associate(models: any) {
    Story.belongsTo(models.Column, {
      foreignKey: 'columnId',
    })
    Story.belongsTo(models.User, {
      foreignKey: 'ownerId',
    })
    Story.belongsToMany(models.User, {
      through: models.UserStory,
      foreignKey: 'storyId',
    })
    Story.belongsTo(models.Board, {
      foreignKey: 'boardId',
    })
  }
}

Story.init({
  id: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
  },
  title: STRING,
  description: STRING,
  color: STRING,
  size: DOUBLE,
  deletedAt: DATE
}, {
  sequelize,
  modelName: 'Story',
});

export type StoryModelStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): Story
}

export default Story as StoryModelStatic
