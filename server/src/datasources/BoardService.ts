import Project from "../models/Project";
import { v4 as uuid } from "uuid";
import Board from "../models/Board";
import ShortForm from "../models/ShortForms";
import Column from "../models/Column";
import Story from "../models/Story";
import Task from "../models/Task";
import Subtask from "../models/Subtask";
import ColorTask from "../models/ColorTask";
import Color from "../models/Color";
import ColorBoard from "../models/ColorBoard";
import ColorSubtask from "../models/ColorSubtask";
import UserStory from "../models/UserStory";
import User from "../models/User";
import UserTask from "../models/UserTask";
import UserSubtask from "../models/UserSubtask";
import { dbConfig } from "../database";
import { Op } from 'sequelize';

export class BoardService {
  initialize() {}

  async archiveProjectById(projectId: any) {
    try {
      const project = await Project.findByPk(projectId);
      if (project) {
        project.deletedAt = new Date();
        await project.save();
      }
    } catch (e) {
      console.log(e);
    }
    return projectId;
  }

  async getProjects() {
    let projectsFromDb;
    try {
      console.log("projectsFromDb");
      projectsFromDb = await Project.findAll({where: {deletedAt: null}});
      console.log(projectsFromDb);
    } catch (e) {
      console.error(e);
    }
    return projectsFromDb;
  }


  async getArchivedProjects() {
    let projectsFromDb;
    try {
      console.log("Archived projectsFromDb");
      projectsFromDb = await Project.findAll({where: {deletedAt: {[Op.not]: null}  }});
    } catch (e) {
      console.error(e);
    }
    return projectsFromDb;
  }


  async getArchivedBoards( projectId:any) {
    let boardsFromDb;
    try {
      console.log("Archived projectsFromDb");
      boardsFromDb = await Board.findAll({where: {deletedAt: {[Op.ne]: null},projectId:projectId} });
    } catch (e) {
      console.error(e);
    }
    return boardsFromDb;
  }

  async getArchivedTasks(boardId:any) {
    let tasksFromDb;
    try {
      console.log("Archived tasksFromDb");
      tasksFromDb = await Task.findAll({where: {deletedAt: {[Op.not]: null}, boardId: boardId}});
    } catch (e) {
      console.error(e);
    }
    return tasksFromDb;
  }
  async getArchivedSubTasks(boardId:any) {
    let subTasksFromDb;
    try {
      console.log("Archived subtasksFromDb");
      subTasksFromDb = await Subtask.findAll({where: {deletedAt: {[Op.not]: null}, boardId: boardId}});
    } catch (e) {
      console.error(e);
    }
    return subTasksFromDb;
  }

  async getArchivedSubTasksByColumnId(columnId:any) {
    let subTasksFromDb;
    try {
      console.log("Archived subtasks by column id FromDb");
      subTasksFromDb = await Subtask.findAll({where: {deletedAt: {[Op.not]: null}, columnId: columnId}});
    } catch (e) {
      console.error(e);
    }
    return subTasksFromDb;
  }
  
  async getArchivedTasksByColumnId(columnId:any) {
    let tasksFromDb;
    try {
      console.log("Archived tasks by column id FromDb");
      tasksFromDb = await Task.findAll({where: {deletedAt: {[Op.not]: null}, columnId: columnId}});
    } catch (e) {
      console.error(e);
    }
    return tasksFromDb;
  }

  async restoreProjectById(projectId: any) {
    let updatedProject;
    try {
      const project = await Project.findByPk(projectId);
      if (project) {
        project.deletedAt = null as any;
        updatedProject = await project.save();
      console.log('updatedProject is: ', updatedProject);

      }
    } catch (e) {
      console.log(e);
    }
    return projectId;;
  }

  async getProjectById(projectId: any) {
    let projectFromDb;
    try {
      console.log("project id from boardservices is",projectId);
      projectFromDb = await Project.findByPk(projectId);
    } catch (e) {
      console.log(e);
    }
    return projectFromDb;
  }

  async getBoardsByProjectId(projectId: any) {
    let boardsFromDb;
    console.log("projectId: ", projectId);

    try {
      boardsFromDb = await Board.findAll({
        where: { projectId, deletedAt: null },
      });
    } catch (e) {
      console.error(e);
    }
    return boardsFromDb;
  }

  async addProject(projectName: any) {
    let addedProject;
    try {
      const largestOrderNumber: number = await Project.max("orderNumber");
      addedProject = await Project.create({
        id: uuid(),
        name: projectName,
        orderNumber: largestOrderNumber + 1,
      });
    } catch (e) {
      console.error(e);
    }
    return addedProject;
  }


  


  async getBoardById(boardId: any) {
    let boardFromDb;
    try {
      boardFromDb = await Board.findByPk(boardId);
    } catch (e) {
      console.error(e);
    }
    return boardFromDb;
  }

  async getAllBoardsRelatedByProjectId(id: any) {
    let currentBoard;
    let prjctId;
    let extractedBoards;
    try{
      currentBoard = await Board.findByPk(id);
      if(currentBoard){
        prjctId = currentBoard.projectId;
        extractedBoards =  Board.findAll({
          where: {
            projectId: prjctId
          }
        })
      }
      } catch (e) {
        console.log(e)
      }
    return extractedBoards;    
  }

  async getBoards() {
    let boardFromDb;
    try {
      boardFromDb = await Board.findAll();
    } catch (e) {
      console.error(e);
    }
    return boardFromDb;
  }

  
  async archiveBoardById(boardId: any) {
    try {
      const board = await Board.findByPk(boardId);
      if (board) {
        board.deletedAt = new Date();
        await board.save();
      }
    } catch (e) {
      console.log(e);
    }
    return boardId;
  }

  async restoreBoardById(boardId: any) {
    let updatedBoard;
    try {
      const board = await Board.findByPk(boardId);
      if (board) {
        board.deletedAt = null as any;
        updatedBoard = await board.save();
        console.log('updatedProject is: ', updatedBoard);
      }
    } catch (e) {
      console.log(e);
    }
    return boardId;
  }

  async deleteBoardById(id: string) {
    try {
      await Board.destroy({
        where: { id: id },
      });
    } catch (e) {
      console.error(e);
    }
    return id;
  }

  //tehtiin funktio getColumns, joka palauttaa kaikki sarakkeet
  async getColumns() {
    let columnFromDb;
    try {
      columnFromDb = await Column.findAll();
    } catch (e) {
      console.error(e);
    }
    return columnFromDb;
  }

  async getTasks() {
    let taskFromDb;
    try {
      taskFromDb = await Task.findAll();
    } catch (e) {
      console.error(e);
    }
    return taskFromDb;
  }

  async getSubtasks() {
    let subtasksFromDb;
    try {
      subtasksFromDb = await Subtask.findAll();
    } catch (e) {
      console.error(e);
    }
    return subtasksFromDb;
  }

  async getColumnsByBoardId(boardId: any) {
    let columnsByBoardIdFromDb;
    try {
      columnsByBoardIdFromDb = await Column.findAll({ where: { boardId } });
    } catch (e) {
      console.error(e);
    }
    return columnsByBoardIdFromDb;
  }

  async getColumnBoardByColumnId(columnId: any) {
    let boardFromDb;
    try {
      const columnFromDb = await Column.findByPk(columnId);
      if (columnFromDb) {
        boardFromDb = await Board.findByPk(columnFromDb.boardId);
      }
    } catch (e) {
      console.error(e);
    }
    return boardFromDb;
  }

  async getColumnById(columnId: any) {
    let columnFromDb;
    try {
      columnFromDb = await Column.findByPk(columnId);
    } catch (e) {
      console.error(e);
    }
    return columnFromDb;
  }

  async editColumnById(columnId: any, name: any) {
    let column;
    try {
      column = await Column.findByPk(columnId);
      if (column) {
        column.name = name;
        await column.save();
      }
    } catch (e) {
      console.error(e);
    }
    return column;
  }

  async deleteColumnById(id: any) {
    try {
      await Column.destroy({
        where: { id },
      });
    } catch (e) {
      console.error(e);
    }
    return id;
  }

  async getStoriesByColumnId(columnId: any) {
    let storiesFromDb;
    try {
      storiesFromDb = await Story.findAll({
        where: { columnId, deletedAt: null },
      });
    } catch (e) {
      console.error(e);
    }
    return storiesFromDb;
  }

  async getTasksByColumnId(columnId: any) {
    let tasksFromDb;
    try {
      tasksFromDb = await Task.findAll({
        where: { columnId, deletedAt: null },
      });
    } catch (e) {
      console.error(e);
    }
    return tasksFromDb;
  }

  async getSubtasksByColumnId(columnId: any) {
    let subtasksFromDb;
    try {
      subtasksFromDb = await Subtask.findAll({
        where: { columnId, deletedAt: null },
      });

      console.log("subtasksFromDb: ", subtasksFromDb);
    } catch (e) {
      console.error(e);
    }
    return subtasksFromDb;
  }
  async restoreSubTaskById(subtaskId: any) {
    let updatedSubTask;
    try {
      const subTask = await Subtask.findByPk(subtaskId);
      if (subTask) {
        subTask.deletedAt = null as any;
        updatedSubTask = await subTask.save();
      }
    } catch (e) {
      console.log(e);
    }
    return updatedSubTask;
  }

  async getStoryById(storyId: any) {
    let storyFromDb;
    try {
      storyFromDb = await Story.findByPk(storyId);
    } catch (e) {
      console.error(e);
    }
    return storyFromDb;
  }

  async getTaskById(taskId: any) {
    let taskFromDb;
    try {
      taskFromDb = await Task.findByPk(taskId);
    } catch (e) {
      console.error(e);
    }
    return taskFromDb;
  }

  async getUserById(userId: any) {
    let userFromDb;
    try {
      userFromDb = await User.findByPk(userId);
    } catch (e) {
      console.log(e);
    }
    return userFromDb;
  }

  async getSubtasksByTaskId(taskId: any) {
    let subtasksFromDb;
    try {
      subtasksFromDb = await Subtask.findAll({ where: { taskId } });
    } catch (e) {
      console.error(e);
    }
    return subtasksFromDb;
  }

  async getColorsByTaskId(taskId: any) {
    let rowsFromDb;
    let colors;
    try {
      rowsFromDb = await ColorTask.findAll({
        where: { taskId },
        attributes: ["colorId"],
      });
      const arrayOfIds = rowsFromDb.map((r) => r.colorId);
      colors = await Promise.all(
        arrayOfIds.map(async (id) => {
          const color = await Color.findByPk(id);
          return color;
        })
      );
    } catch (e) {
      console.log(e);
    }
    return colors;
  }

  async getColorsBySubtaskId(subtaskId: any) {
    let rowsFromDb;
    let colors;
    try {
      rowsFromDb = await ColorSubtask.findAll({
        where: { subtaskId },
        attributes: ["colorId"],
      });
      const arrayOfIds = rowsFromDb.map((r) => r.colorId);
      colors = await Promise.all(
        arrayOfIds.map(async (id) => {
          const color = await Color.findByPk(id);
          return color;
        })
      );
    } catch (e) {
      console.log(e);
    }
    return colors;
  }

  async getMembersByStoryId(storyId: any) {
    let rowsFromDb;
    let members;
    try {
      rowsFromDb = await UserStory.findAll({
        where: { storyId },
        attributes: ["userId"],
      });
      const arrayOfIds = rowsFromDb.map((r) => r.userId);
      members = await Promise.all(
        arrayOfIds.map(async (id) => {
          const user = await User.findByPk(id);
          return user;
        })
      );
    } catch (e) {
      console.error(e);
    }
    return members;
  }

  async getMembersByTaskId(taskId: any) {
    let rowsFromDb;
    let members;
    try {
      rowsFromDb = await UserTask.findAll({
        where: { taskId },
        attributes: ["userId"],
      });
      const arrayOfIds = rowsFromDb.map((r) => r.userId);
      members = await Promise.all(
        arrayOfIds.map(async (id) => {
          const user = await User.findByPk(id);
          return user;
        })
      );
    } catch (e) {
      console.error(e);
    }
    return members;
  }

  async getMembersBySubtaskId(subtaskId: any) {
    let rowsFromDb;
    let members;
    try {
      rowsFromDb = await UserSubtask.findAll({
        where: { subtaskId },
        attributes: ["userId"],
      });
      const arrayOfIds = rowsFromDb.map((r) => r.userId);
      members = await Promise.all(
        arrayOfIds.map(async (id) => {
          const user = await User.findByPk(id);
          return user;
        })
      );
    } catch (e) {
      console.error(e);
    }
    return members;
  }

  async editStoryById(
    storyId: any,
    title: any,
    size: any,
    ownerId: any,
    oldMemberIds: any,
    newMemberIds: any,
    description: any
  ) {
    // Logic for figuring out who was deleted and who was added as a new member for the story
    const removedMemberIds = oldMemberIds.filter(
      (id: any) => !newMemberIds.includes(id)
    );
    const addedMembers = newMemberIds.filter(
      (id: any) => !oldMemberIds.includes(id)
    );
    let story: any;
    try {
      story = await Story.findByPk(storyId);
      story.title = title;
      story.size = size;
      story.ownerId = ownerId;
      story.description = description;
      await story.save();
      // Updating userstories junction table
      await Promise.all(
        addedMembers.map(async (userId: any) => {
          await this.addMemberForStory(story.id, userId);
        })
      );
      await Promise.all(
        removedMemberIds.map(async (userId: any) => {
          await UserStory.destroy({
            where: {
              userId,
              storyId: story.id,
            },
          });
        })
      );
    } catch (e) {
      console.error(e);
    }
    return story;
  }

  async editTaskById(
    taskId: any,
    title: any,
    storyPoints: any,
    spentStoryPoints: any,
    ownerId: any,
    oldMemberIds: any,
    newMemberIds: any,
    oldColorIds: any,
    newColorIds: any,
    description: any,
    columnId: any,
  ) {
    // Logic for figuring out who was deleted and who was added as a new member for the task
    const removedMemberIds = oldMemberIds.filter(
      (id: any) => !newMemberIds.includes(id)
    );
    const addedMembers = newMemberIds.filter(
      (id: any) => !oldMemberIds.includes(id)
    );
    const removedColorIds = oldColorIds.filter(
      (id: any) => !newColorIds.includes(id)
    );
    const addedColors = newColorIds.filter(
      (id: any) => !oldColorIds.includes(id)
    );
    let task: any;

    try {
      task = await Task.findByPk(taskId);
      task.title = title;
      task.storyPoints = storyPoints;
      task.spentStoryPoints = spentStoryPoints;
      task.ownerId = ownerId;
      task.description = description;
      task.columnId = columnId;
      await task.save();
      // Updating usertasks junction table
      await Promise.all(
        addedMembers.map(async (userId: any) => {
          await this.addMemberForTask(task.id, userId);
        })
      );
      await Promise.all(
        removedMemberIds.map(async (userId: any) => {
          await UserTask.destroy({
            where: {
              userId,
              taskId: task.id,
            },
          });
        })
      );
      await Promise.all(
        addedColors.map(async (colorId: any) => {
          await this.addColorForTask(task.id, colorId);
        })
      );
      await Promise.all(
        removedColorIds.map(async (colorId: any) => {
          await ColorTask.destroy({
            where: {
              colorId,
              taskId: task.id,
            },
          });
        })
      );
    } catch (e) {
      console.error(e);
    }
    return task;
  }

  async editSubtask(
    id: any,
    name: any,
    content: any,
    storyPoints: any,
    spentStoryPoints: any,
    ownerId: any,
    oldMemberIds: any,
    newMemberIds: any,
    oldColorIds: any,
    newColorIds: any,
    columnId: any,
  ) {
    // Logic for figuring out who was deleted and who was added as a new member for the subtask
    const removedMemberIds = oldMemberIds.filter(
      (id: any) => !newMemberIds.includes(id)
    );
    const addedMembers = newMemberIds.filter(
      (id: any) => !oldMemberIds.includes(id)
    );
    const removedColorIds = oldColorIds.filter(
      (id: any) => !newColorIds.includes(id)
    );
    const addedColors = newColorIds.filter(
      (id: any) => !oldColorIds.includes(id)
    );
    let subtask: any;
    try {
      subtask = await Subtask.findByPk(id);
      subtask.name = name;
      subtask.content = content;
      subtask.storyPoints = storyPoints;
      subtask.spentStoryPoints = spentStoryPoints;
      subtask.ownerId = ownerId;
      subtask.columnId = columnId;
      await subtask.save();
      // Updating userSubtasks junction table
      await Promise.all(
        addedMembers.map(async (userId: any) => {
          await this.addMemberForSubtask(subtask.id, userId);
        })
      );
      await Promise.all(
        removedMemberIds.map(async (userId: any) => {
          await UserSubtask.destroy({
            where: {
              userId,
              subtaskId: subtask.id,
            },
          });
        })
      );
      await Promise.all(
        addedColors.map(async (colorId: any) => {
          await this.addColorForSubtask(subtask.id, colorId);
        })
      );
      await Promise.all(
        removedColorIds.map(async (colorId: any) => {
          await ColorSubtask.destroy({
            where: {
              colorId,
              subtaskId: subtask.id,
            },
          });
        })
      );
    } catch (e) {
      console.error(e);
    }
    return subtask;
  }

  async deleteStoryById(storyId: any) {
    try {
      await Story.destroy({
        where: { id: storyId },
      });
    } catch (e) {
      console.error(e);
    }
    return storyId;
  }

  async deleteTaskById(taskId: any) {
    try {
      await Task.destroy({
        where: { id: taskId },
      });
    } catch (e) {
      console.error(e);
    }
    return taskId;
  }

  /*
    Gets the order of columns in certain board, returns an array of columnIds in the correct order.
    This field is for keeping track of the order in which the columns are displayed in the board
    */
  async getColumnOrderOfBoard(boardId: any) {
    let arrayOfIds;
    try {
      const columns = await Column.findAll({
        attributes: ["id"],
        where: { boardId },
        order: dbConfig.Sequelize.literal("orderNumber ASC"),
      });
      arrayOfIds = columns.map((column) => column.id);
    } catch (e) {
      console.error(e);
    }
    return arrayOfIds;
  }

  async getTicketOrderOfColumn(columnId: any) {
    let arrayOfObjectsInOrder;
    // TODO: Figure out if this could be done better
    try {
      const subtasks = await Subtask.findAll({
        attributes: ["id", "columnOrderNumber"],
        where: { columnId, deletedAt: null },
      });
      const arrayOfSubtaskObjects = subtasks.map((subtask) => ({
        ticketId: subtask.id,
        type: "subtask",
        columnOrderNumber: subtask.columnOrderNumber,
      }));

      const tasksFromDb = await Task.findAll({
        attributes: ["id", "columnOrderNumber"],
        where: { columnId, deletedAt: null },
      });
      const arrayOfTaskObjects = tasksFromDb.map((task) => ({
        ticketId: task.id,
        type: "task",
        columnOrderNumber: task.columnOrderNumber,
      }));

      arrayOfObjectsInOrder = arrayOfTaskObjects
        .concat(arrayOfSubtaskObjects)
        .sort((a, b) => a.columnOrderNumber - b.columnOrderNumber)
        .map((obj) => {
          const copy: {
            columnOrderNumber: any;
            type: string;
            ticketId: any;
          } = { ...obj };
          delete copy.columnOrderNumber;
          return { ...copy };
        });
    } catch (e) {
      console.error(e);
    }
    return arrayOfObjectsInOrder;
  }

  async addBoard(boardName: any, prettyId: any, projectId: any) {
    let addedBoard;
    try {
      const largestOrderNumber: any = await Board.max("orderNumber", {
        where: { projectId },
      });
      console.log("addBoard projectId: ", projectId);
      addedBoard = await Board.create({
        id: uuid(),
        name: boardName,
        prettyId,
        orderNumber: largestOrderNumber + 1,
        projectId,
      });

      console.log("Added board: ", addedBoard);
    } catch (e) {
      console.error(e);
    }
    return addedBoard;
  }

  async addShortForm(prettyId: any, projectId: any) {
    let addedShortForm;
    try {
      console.log("addShortForm projectId: ", projectId);
      addedShortForm = await ShortForm.create({
        id: uuid(),
        prettyId,
        projectId,
      });
      console.log("Added ShortForm: ", addedShortForm);
    } catch (e) {
      console.error(e);
    }
    return addedShortForm;
  }

  async getShortFormsByProjectId(projectId: any) {
    let shortFormsFromDb;
    console.log("projectId: ", projectId);

    try {
      shortFormsFromDb = await ShortForm.findAll({
        where: { projectId },
      });
    } catch (e) {
      console.error(e);
    }
    return shortFormsFromDb;
  }

  async addColumnForBoard(boardId: any, columnName: any, hidden: any,) {
    /*
          At the time of new columns' creation we want to display it as
          the component in the very right of the board,
          hence it is given the biggest orderNumber of the board
        */
    let addedColumn;
    try {
      const largestOrderNumber: any = await Column.max("orderNumber", {
        where: { boardId },
      });
      addedColumn = await Column.create({
        id: uuid(),
        boardId,
        name: columnName,
        orderNumber: largestOrderNumber + 1,
        hidden: hidden,
      });

      console.log("addedColumn: ", addedColumn);
    } catch (e) {
      console.error(e);
    }
    return addedColumn;
  }

  async findTheLargestOrderNumberOfColumn(columnId: any) {
    let largestColumnOrderNumberForTask: any;
    let largestColumnOrderNumberForSubtask: any;
    try {
      largestColumnOrderNumberForTask =
        (await Task.max("columnOrderNumber", {
          where: {
            columnId,
          },
        })) || 0;
      largestColumnOrderNumberForSubtask =
        (await Subtask.max("columnOrderNumber", {
          where: {
            columnId,
          },
        })) || 0;
    } catch (e) {
      console.error(e);
    }

    const largestColumnOrderNumber = Math.max(
      largestColumnOrderNumberForTask,
      largestColumnOrderNumberForSubtask
    );
    return largestColumnOrderNumber || 0;
  }

  async findTheLargestSwimlaneOrderNumberOfBoard(boardId: any) {
    let largestSwimlaneOrderNumber;
    try {
      largestSwimlaneOrderNumber =
        (await Task.max("swimlaneOrderNumber", {
          where: {
            boardId,
          },
        })) || 0;
    } catch (e) {
      console.log(e);
    }
    return largestSwimlaneOrderNumber;
  }

  async addStoryForColumn(
    boardId: any,
    columnId: any,
    title: any,
    size: any,
    ownerId: any,
    memberIds: any,
    description: any
  ) {
    let addedStory: any;
    try {
      // const storyBoard = await Board.findByPk(boardId)

      addedStory = await Story.create({
        id: uuid(),
        boardId,
        columnId,
        title,
        size,
        ownerId,
        memberIds,
        description,
      });
      await Promise.all(
        memberIds.map(async (memberId: any) => {
          await this.addMemberForStory(addedStory.id, memberId);
        })
      );
    } catch (e) {
      console.error(e);
    }
    return addedStory;
  }

  async addTaskForColumn(
    boardId: any,
    columnId: any,
    title: any,
    storyPoints: any,
    spentStoryPoints: any,
    ownerId: any,
    memberIds: any,
    colorIds: any,
    description: any
  ) {
    /*
          At a new tasks' creation we want to display it as the lowermost task in its column,
          hence it is given the biggest columnOrderNumber of the column
          By default new task will be dirssplyed at the bottom of the swimlane view
        */
    let addedTask: any;
    try {
      const largestOrderNumber: any = await this.findTheLargestOrderNumberOfColumn(
        columnId
      );
      const largestSwimlaneOrderNumber: any = await this.findTheLargestSwimlaneOrderNumberOfBoard(
        boardId
      );
      const tasksBoard = await Board.findByPk(boardId);
      if (tasksBoard) {
        const prettyIdOfBoard = tasksBoard.prettyId;

        tasksBoard.ticketCount += 1;
        const updatedBoard = await tasksBoard.save();

        addedTask = await Task.create({
          id: uuid(),
          prettyId: `${prettyIdOfBoard}-${updatedBoard.ticketCount}`,
          boardId,
          columnId,
          title,
          storyPoints,
          spentStoryPoints,
          ownerId,
          description,
          columnOrderNumber: largestOrderNumber + 1,
          swimlaneOrderNumber: largestSwimlaneOrderNumber + 1,
        });
        await Promise.all(
          memberIds.map(async (memberId: any) => {
            await this.addMemberForTask(addedTask.id, memberId);
          })
        );
        await Promise.all(
          colorIds.map(async (colorId: any) => {
            await this.addColorForTask(addedTask.id, colorId);
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
    return addedTask;
  }

  async addMemberForStory(storyId: any, userId: any) {
    let story;
    try {
      await UserStory.create({
        userId,
        storyId,
      });
      story = await Story.findByPk(storyId);
    } catch (e) {
      console.error(e);
    }
    return story;
  }

  async addMemberForTask(taskId: any, userId: any) {
    let task;
    try {
      await UserTask.create({
        userId,
        taskId,
      });
      task = await Task.findByPk(taskId);
    } catch (e) {
      console.error(e);
    }
    return task;
  }

  async addMemberForSubtask(subtaskId: any, userId: any) {
    let subtask;
    try {
      await UserSubtask.create({
        userId,
        subtaskId,
      });
      subtask = await Subtask.findByPk(subtaskId);
    } catch (e) {
      console.error(e);
    }
    return subtask;
  }

  async addColorForTask(taskId: any, colorId: any) {
    let task;
    try {
      await ColorTask.create({
        id: uuid(),
        colorId,
        taskId,
      });
      task = await Task.findByPk(taskId);
    } catch (e) {
      console.log(e);
    }
    return task;
  }

  async addColorForSubtask(subtaskId: any, colorId: any) {
    let subtask;
    try {
      await ColorSubtask.create({
        id: uuid(),
        colorId,
        subtaskId,
      });
      subtask = await Subtask.findByPk(subtaskId);
    } catch (e) {
      console.log(e);
    }
    return subtask;
  }

  async addSubtaskForTask(
    taskId: any,
    columnId: any,
    boardId: any,
    name: any,
    content: any,
    storyPoints: any,
    spentStoryPoints: any,
    ownerId: any,
    memberIds: any,
    colorIds: any,
    ticketOrder: any
  ) {
    /*
          At the time of new subtask's creation we want to display it under its parent task
          hence we give it the columnOrderNumber one greater than the task's
          If subtask is created into diffenrent column than the current 'home' of parent task
          the subtask will be placed at the bottom of the column
        */
    let addedSubtask: any;
    try {
      const subtasksBoard = await Board.findByPk(boardId);
      if (subtasksBoard) {
        const prettyIdOfBoard = subtasksBoard.prettyId;
        console.log("prettyIdOfBoard: ", prettyIdOfBoard);
        subtasksBoard.ticketCount += 1;
        const updatedBoard = await subtasksBoard.save();
        console.log("updatedBoard: ", updatedBoard);
        console.log("updatedBoard.ticketCount: ", updatedBoard.ticketCount);

        addedSubtask = await Subtask.create({
          id: uuid(),
          prettyId: `${prettyIdOfBoard}-${updatedBoard.ticketCount}`,
          name,
          content,
          storyPoints,
          spentStoryPoints,
          taskId,
          columnId,
          boardId,
          ownerId,
        });
        const parentTask = await Task.findByPk(taskId, {
          attributes: ["columnId"],
        });

        const newTicketOrder = Array.from(ticketOrder);
        // figure out if the created subtask was created into same column than its parent task
        // If so, give the added subtask an index one greater than the parent task's so that
        // subtask will appear under parent task
        if (parentTask && columnId === parentTask.columnId) {
          const indexOfParentTask = ticketOrder.findIndex(
            (obj: any) => obj.ticketId === taskId
          );
          newTicketOrder.splice(indexOfParentTask + 1, 0, {
            ticketId: addedSubtask.id,
            type: "subtask",
          });
        } else {
          newTicketOrder.push({ ticketId: addedSubtask.id, type: "subtask" });
        }
        await this.reOrderTicketsOfColumn(newTicketOrder, columnId);
        await Promise.all(
          memberIds.map(async (memberId: any) => {
            await this.addMemberForSubtask(addedSubtask.id, memberId);
          })
        );
        await Promise.all(
          colorIds.map(async (colorId: any) => {
            await this.addColorForSubtask(addedSubtask.id, colorId);
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
    return addedSubtask;
  }

  async deleteSubtaskById(subtaskId: any) {
    try {
      await Subtask.destroy({
        where: { id: subtaskId },
      });
    } catch (e) {
      console.error(e);
    }
    return subtaskId;
  }

  async archiveSubtaskById(subtaskId: any, columnId: any) {
    try {
      const subtask = await Subtask.findByPk(subtaskId);
      if (subtask) {
        subtask.deletedAt = new Date();
        subtask.columnId = columnId;
        await subtask.save();
      }
    } catch (e) {
      console.error(e);
    }
    return subtaskId;
  }

  async reOrderTicketsOfColumn(newOrderArray: any, columnId: any) {
    let column;
    try {
      await Promise.all(
        newOrderArray.map(async (obj: any, index: any) => {
          if (obj.type === "task") {
            const task = await Task.findByPk(obj.ticketId);
            if (task) {
              task.columnOrderNumber = index;
              await task.save();
            }
          } else if (obj.type === "subtask") {
            const subtask = await Subtask.findByPk(obj.ticketId);
            if (subtask) {
              subtask.columnOrderNumber = index;
              await subtask.save();
            }
          }
        })
      );
      column = await Column.findByPk(columnId);
    } catch (e) {
      console.log(e);
    }
    return column;
  }

  async changeTasksColumnId(taskId: any, columnId: any) {
    try {
      const task = await Task.findByPk(taskId);
      if (task) {
        task.columnId = columnId;
        await task.save();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async changeSubtasksColumnId(subtaskId: any, columnId: any) {
    try {
      const subtask = await Subtask.findByPk(subtaskId);
      if (subtask) {
        subtask.columnId = columnId;
        await subtask.save();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async changeTicketsColumnId(type: any, ticketId: any, columnId: any) {
    if (type === "task") {
      await this.changeTasksColumnId(ticketId, columnId);
    } else if (type === "subtask") {
      await this.changeSubtasksColumnId(ticketId, columnId);
    }
  }

  async reOrderColumns(columnOrder: any) {
    try {
      await Promise.all(
        columnOrder.map(async (id: any, index: any) => {
          const column = await Column.findByPk(id);
          if (column) {
            column.orderNumber = index;
            await column.save();
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  async reOrderSwimlanes(swimlaneOrder: any) {
    try {
      await Promise.all(
        swimlaneOrder.map(async (id: any, index: any) => {
          const task = await Task.findByPk(id);
          if (task) {
            task.swimlaneOrderNumber = index;
            await task.save();
          }
        })
      );
    } catch (e) {
      console.error(e);
    }
  }

  async getColors() {
    let colorsFromDb;
    try {
      colorsFromDb = await Color.findAll();
    } catch (e) {
      console.log(e);
    }
    return colorsFromDb;
  }

  async getUsers() {
    let usersFromDb;
    try {
      usersFromDb = await User.findAll();
    } catch (e) {
      console.error(e);
    }
    return usersFromDb;
  }

  async getArchivedUsers() {
    let usersFromDb;
    try {
      usersFromDb = await User.findAll({where: {deletedAt: {[Op.not]: null} }});
    } catch (e) {
      console.error(e);
    }
    return usersFromDb;
  }

  async addUser(userName: string, projectId: string) {
    let addedUser;
    try {
      addedUser = await User.create({
        id: uuid(),
        userName: userName,
        projectId: projectId,
      });
    } catch (e) {
      console.error(e);
    }
    return addedUser;
  }

  async archiveUser(id: string, userName: string) {
    let archivedUser;
    try {
      archivedUser = await User.findByPk(id);
      if (archivedUser) {
        if (archivedUser.userName.includes(" (Removed user)")) {
          let length = archivedUser.userName.length;

          archivedUser.userName = archivedUser.userName.substring(0, length - 14);
        } else {
          archivedUser.userName = userName + " (Removed user)";
          archivedUser.deletedAt = new Date();
        }
        await archivedUser.save();
      }
    } catch (e) {
      console.error(e);
    }
    return archivedUser;
  }

  async archiveUserById(userId: any) {
    let user = await User.findByPk(userId);
    try {
      if (user) {
        user.deletedAt = new Date();
        console.log('user.deletedAt: ', user.deletedAt);
        
        await user.save().then(function () {
          console.log('Saved date to deteletAt');
        });
      } 
    } catch (e) {
      console.log(e);
    }
    return userId;
  }

  async restoreUserById(id: string) {
    let updatedUser;
    updatedUser = await User.findByPk(id);
    try {
      if (updatedUser) {
        updatedUser.deletedAt = null as any;
        // Remove " (Removed user)" from users name
        let length = updatedUser.userName.length;
        updatedUser.userName = updatedUser.userName.substring(0, length - 14);
        await updatedUser.save();
      }
    } catch (e) {
      console.log(e);
    }
    return updatedUser;
  }

  async deleteBoard(boardId: any) {
    try {
      await Board.destroy({
        where: { id: boardId },
      });
    } catch (e) {
      console.error(e);
    }
    return boardId;
  }

  

  async allEpicColors() {
    let epicColorsFromDB;
    try {
      epicColorsFromDB = await ColorBoard.findAll();
    } catch (e) {
      console.error(e);
    }
    return epicColorsFromDB;
  }

  async addEpicColors(colorId: any, boardId: any, name: any) {
    try {
      const colors = await ColorBoard.findAll();
      const board = colors.filter((color) => color.colorId === colorId);
      const boardColors = board.filter((color) => color.boardId === boardId);
      if (boardColors.length > 0) {
        if (
          boardColors[0].getDataValue("colorId") === colorId &&
          boardColors[0].getDataValue("boardId") === boardId
        ) {
          await ColorBoard.destroy({
            where: {
              colorId: colorId,
              boardId: boardId,
            },
          });
          return await ColorBoard.create({
            colorId: colorId,
            boardId: boardId,
            name: name,
          });
        }
      } else {
        return await ColorBoard.create({
          colorId: colorId,
          boardId: boardId,
          name: name,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getOwnerById(ownerId: any) {
    let owner;
    try {
      owner = await User.findByPk(ownerId);
    } catch (e) {
      console.log(e);
    }
    return owner;
  }

  async archiveStoryById(storyId: any) {
    try {
      const story = await Story.findByPk(storyId);
      if (story) {
        story.deletedAt = new Date();
        await story.save();
      }
    } catch (e) {
      console.log(e);
    }
    return storyId;
  }

  async restoreStoryById(storyId: any) {
    let updatedStory;
    try {
      const story = await Story.findByPk(storyId);
      if (story) {
        story.deletedAt = null as any;
        updatedStory = await story.save();
      }
    } catch (e) {
      console.log(e);
    }
    return updatedStory;
  }

  async archiveTaskById(taskId: any, columnId: any) {
    try {
      const task = await Task.findByPk(taskId);
      if (task) {
        task.deletedAt = new Date();
        task.columnId = columnId;
        await task.save();
      }
    } catch (e) {
      console.log(e);
    }
    return taskId;
  }

  async restoreTaskById(taskId: any) {
    let updatedTask;
    try {
      const task = await Task.findByPk(taskId);
      if (task) {
        task.deletedAt = null as any;
        updatedTask = await task.save();
      }
    } catch (e) {
      console.log(e);
    }
    return updatedTask;
  }

  

  async getSwimlaneOrderOfBoard(boardId: any) {
    let swimlaneOrder;
    try {
      swimlaneOrder = await Task.findAll({
        attributes: ["id"], 
        where: { boardId, deletedAt: null },
        order: dbConfig.Sequelize.literal("swimlaneOrderNumber ASC"),
      });
      swimlaneOrder = swimlaneOrder.map((item) => item.id);
    } catch (e) {
      console.log(e);
    }
    return swimlaneOrder;
  }

  async updateSwimlaneOrderNumbers(boardId: any, newSwimlaneOrder: any) {
    try {
      await Promise.all(
        newSwimlaneOrder.map(async (obj: any) => {
          const task = await Task.findByPk(obj.id);
          if (task) {
            task.swimlaneOrderNumber = obj.swimlaneOrderNumber;
            await task.save();
          }
        })
      );
    } catch (e) {
      console.log(e);
    }
    return boardId;
  }
}
