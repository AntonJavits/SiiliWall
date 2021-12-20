import Project from "../src/models/Project";
import Board from "../src/models/Board";
import Column from "../src/models/Column";
import Subtask from "../src/models/Subtask";
import Task from "../src/models/Task";
import { dbConfig } from "../src/database";
import Color from "../src/models/Color";
import ColorSubtask from "../src/models/ColorSubtask";
import ColorTask from "../src/models/ColorTask";
import User from "../src/models/User";
import UserSubtask from "../src/models/UserSubtask";
//import UserStory from "../src/models/UserStory";
import Usertask from "../src/models/UserTask";
import dummyData from "./dummyData";

//TODO Move all Sequelize stuff from utils.ts to this file
export const projectByName = async (name: string) => {
  return await Project.findAll({
    where: {
      name: name,
    },
  });
};

export const mapProjectByName = async (name: string) => {
  return (
    await Project.findAll({
      where: {
        name: name,
      },
    })
  ).map((project) => project.get("name"));
};

export const mapProjectById = async (id: string) => {
  return (
    await Project.findAll({
      where: {
        id: id,
      },
    })
  ).map((project) => project.get("id"));
};
//Remember to return to this one
export const mapProjectBoardsByProjectId = async (id: string) => {
  return (
    await Board.findAll({
      where: {
        id: id,
      },
    })
  ).map((board) => board.get("projectId"));
};

export const findByProjectPk = async (id: string) => {
  return await Project.findByPk(id);
};
//Remember to return to this
//HOW WE TEST THESE?
export const initializeDb = async () => {
  await dbConfig.sync({ force: true });
  await Promise.all(
    dummyData.users.map(async (user) => {
      const resolved = await User.create(user);
      return resolved;
    })
  );

  const users = await User.findAll();
  expect(users.length).toEqual(7);

  await Promise.all(
    dummyData.projects.map(async (project) => {
      const resolved = await Project.create(project);
      return resolved;
    })
  );

  const projects = await Project.findAll();
  expect(projects.length).toEqual(1);

  await Promise.all(
    dummyData.colors.map(async (color) => {
      const resolved = await Color.create(color);
      console.log(resolved);
      return resolved;
    })
  );
  const colors = await Color.findAll();
  console.log(colors.length);
  expect(colors.length).toEqual(9);

  await Promise.all(
    dummyData.boards.map(async (board) => {
      const resolved = await Board.create(board);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.columns.map(async (column) => {
      const resolved = await Column.create(column);
      return resolved;
    })
  );
  //commented out because of deleted stories data
  // await Promise.all(
  //   dummyData.stories.map(async (story) => {
  //     const resolved = await Story.create(story);
  //     return resolved;
  //   })
  // );
  await Promise.all(
    dummyData.tasks.map(async (task) => {
      const resolved = await Task.create(task);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.subtasks.map(async (subtask) => {
      const resolved = await Subtask.create(subtask);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.colorsubtasks.map(async (colorsubtask) => {
      const resolved = await ColorSubtask.create(colorsubtask);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.colortasks.map(async (colortask) => {
      const resolved = await ColorTask.create(colortask);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.userSubtasks.map(async (usersubtask) => {
      const resolved = await UserSubtask.create(usersubtask);
      return resolved;
    })
  );
  await Promise.all(
    dummyData.usertasks.map(async (usertask) => {
      const resolved = await Usertask.create(usertask);
      return resolved;
    })
  );

  // await Promise.all(
  //   dummyData.userStories.map(async (userstory) => {
  //     const resolved = await UserStory.create(userstory);
  //     return resolved;
  //   })
  // );

  return Promise.resolve();
};

export const afterTests = async () => {
  // closeHttpServer()

  await dbConfig.drop();
  await dbConfig.close();

  return Promise.resolve();
};

export const boardsInTheDb = async () => {
  return await Board.findAll();
};

export const addBoardInTheDb = async (data) => {
  return await Board.bulkCreate(data);
};

export const boardInTheDb = async (id) => {
  return await Board.findByPk(id);
};

export const columnsOfBoardInTheDb = async (id) => {
  const columns = await Column.findAll({ where: { boardId: id } });
  return columns;
};

export const addColumnForBoard = async (data) => {
  return await Column.bulkCreate(data);
};

export const columnsInTheDb = async () => {
  return await Column.findAll();
};
//RETURN TO THIS LATER
/*
export const storiesOfColumnInTheDb = async (id) => {
  const stories = await Story.findAll({ where: { columnId: id } });
  return stories;
};

export const storiesInTheDb = async () => {
  return await Story.findAll();
};

//RETURN TO THIS LATER
export const storyById = async (id) => {
  let story;

  story = await Story.findByPk(id);

  return story;
};
*/
export const tasksOfColumnInTheDb = async (id) => {
  return await Task.findAll({ where: { columnId: id } });
};

export const tasksInTheDb = async () => {
  return await Task.findAll();
};

export const taskById = async (id) => {
  let task;

  task = await Task.findByPk(id);

  return task;
};

export const getTaskOrderOfColumn = async (columnId) => {
  let arrayOfIds;

  const tasks = await Task.findAll({
    attributes: ["id"],
    where: { columnId },
    order: dbConfig.Sequelize.literal("columnOrderNumber ASC"),
  });
  arrayOfIds = tasks.map((task) => task.getDataValue("id"));

  return arrayOfIds;
};

export const subtasksOfTaskInTheDb = async (taskId) => {
  let subtasks;

  subtasks = await Subtask.findAll({
    where: { taskId },
  });
  return subtasks;
};

export const subtasksInTheDb = async () => {
  let subtasks;

  subtasks = await Subtask.findAll();
  return subtasks;
};

