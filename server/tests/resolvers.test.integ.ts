import { afterTests, initializeDb } from "./sequelize-common";
import { Query as BoardQuery } from "../src/graphql/resolvers/board-resolvers";
import { Query as ProjectQuery } from "../src/graphql/resolvers/project-resolver";
import { Mutation as BoardMutation } from "../src/graphql/resolvers/board-resolvers";
import { Mutation as ProjectMutation } from "../src/graphql/resolvers/project-resolver";
import { Mutation as UserMutation } from "../src/graphql/resolvers/user-resolvers";
import { Query as UserQuery } from "../src/graphql/resolvers/user-resolvers";
import { Mutation as ColumnMutation } from "../src/graphql/resolvers/column-resolvers";
import { Query as ColumnQuery } from "../src/graphql/resolvers/column-resolvers";
import { Mutation as TaskMutation } from "../src/graphql/resolvers/task-resolvers";
import { Query as TaskQuery } from "../src/graphql/resolvers/task-resolvers";
import { columns, tasks } from "./dummyData";
import { Mutation as SubTaskMutation } from "../src/graphql/resolvers/subtask-resolver";
import { Query as subTaskQuery } from "../src/graphql/resolvers/subtask-resolver";
import { board1 } from "./dummyData";

describe("With initial test data in the database, graphql queries", () => {
  // Reinitialize the database before each test in this describe block
  beforeEach(async () => await initializeDb());

  test("allBoards query returns all the boards in the database", async () => {
    const response = await BoardQuery.allBoards();
    expect(response.slice().length).toEqual(4);
  });

  test("allProject query returns all the boards in the database", async () => {
    const response = await ProjectQuery.allProjects();
    expect(response.slice().length).toEqual(1);
  });
});

describe("mutations", () => {
  // Reinitialize the database before each test in this describe block
  beforeEach(() => initializeDb());

  test("should add project to db", async () => {
    const projects = await ProjectQuery.allProjects();
    expect(projects.length).toEqual(1);
    await ProjectMutation.addProject(null, {
      name: "SiiliWall2",
    });

    const project = await ProjectQuery.allProjects();
    expect(project.length).toEqual(2);
  });

  test("should add board to db", async () => {
    const boards = await BoardQuery.allBoards();
    expect(boards.length).toEqual(4);
    await BoardMutation.addBoard(null, {
      name: "PO:n taulu 2",
      prettyId: "PO2",
      eventId: "9da1b35f-181a-4397-a5a5-47abced10a66",
      projectId: "9da1b35f-181a-4397-a5a5-47abced10a66",
    });

    const board = await BoardQuery.allBoards();
    const boardId = await BoardQuery.boardById(null, board1);
    expect(board.length).toEqual(5);
  });

  test("should add user to db", async () => {
    const users = await UserQuery.allUsers();
    expect(users.length).toEqual(7);
    await UserMutation.addUser(null, {
      userName: "Paavo",
      passwordHash: "pVfUtAA3",
      email: "dmonteith0@mysql.com",
    });

    const user = await UserQuery.allUsers();
    expect(user.length).toEqual(8);
  });

  test("should add column to board in db", async () => {
    const columns = await ColumnQuery.allColumns();
    expect(columns.slice().length).toEqual(16);
    await ColumnMutation.addColumnForBoard(null, {
      boardId: "83fa4f89-8ea1-4d1c-9fee-321daa941485",
      columnName: "fsefsef",
      eventId: null,
    });

    const column = await ColumnQuery.allColumns();
    expect(column.length).toEqual(17);
  });

  test("should add tasks to db", async () => {
    const tasks = await TaskQuery.allTasks();
    expect(tasks.slice().length).toEqual(8);
    await TaskMutation.addTaskForColumn(null, {
      boardId: "0f154e01-f8ba-49c8-b2dc-e374d28f7f83",
      columnId: "f6209adb-91ca-476b-8269-328a82d05d4a",
      title: "Add drag and drop function to cards",
      storyPoints: null,
      spentStoryPoints: null,
      ownerId: "654df13f-51be-4b25-8f0e-7c2f40a3a81e",
      memberIds: 1,
      colorIds: "ca1b1793-e569-4fb3-8498-5a36406eeca6",
      description: " ",
      eventId: null,
    });

    const task = await TaskQuery.allTasks();
    expect(task.length).toEqual(9);
  });

  test("should add subtask to db", async () => {
    const subtasks = await subTaskQuery.allSubtasks();
    expect(subtasks.slice().length).toEqual(6);
    await SubTaskMutation.addSubtaskForTask(null, {
      taskId: "f6209adb-91ca-476b-8269-328a82d05555",
      columnId: "ce175646-4035-41f5-99d7-7d742f0e8ac5",
      boardId: "0f154e01-f8ba-49c8-b2dc-e374d28f7f83",
      name: "sadsadadsa",
      content: "",
      storyPoints: 2,
      spentStoryPoints: 0,
      ownerId: "6285867e-7db8-4769-8730-26d18ef9aba9",
      memberIds: 2,
      colorIds: 2,
      ticketOrder: 2,
      eventId: 2,
    });

    const subtask = await subTaskQuery.allSubtasks();
    expect(subtask.length).toEqual(7);
  });

  test("should be able to move a task from column to another", async () => {
    const sourceColumn1 = await ColumnQuery.columnById(null, columns[9]);
    const destColumn1 = await ColumnQuery.columnById(null, columns[10]);
    expect(tasks[0].columnId).toEqual(columns[9].id);

    await ColumnMutation.moveTicketFromColumn(null, {
      type: "task",
      ticketId: tasks[0].id,
      sourceColumnId: sourceColumn1.dataValues.id,
      destColumnId: destColumn1.dataValues.id,
      sourceTicketOrder: [],
      destTicketOrder: [{ ticketId: tasks[0].id, type: "task" }],
      eventId: "",
    });
    const changedTasks = await TaskQuery.taskById(null, tasks[0]);
    expect(changedTasks.dataValues.columnId).toEqual(columns[10].id);
  });
});
afterAll(() => afterTests());
