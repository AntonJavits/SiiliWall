import Project from "../src/models/Project";

import {
  findByProjectPk,
  mapProjectByName,
  projectByName,
  afterTests,
  initializeDb,
  mapProjectById,
  boardsInTheDb,
  addBoardInTheDb,
  boardInTheDb,
  columnsOfBoardInTheDb,
  addColumnForBoard,
  columnsInTheDb,
  tasksOfColumnInTheDb,
  tasksInTheDb,
  getTaskOrderOfColumn,
  subtasksOfTaskInTheDb,
  subtasksInTheDb,
  mapProjectBoardsByProjectId,
} from "./sequelize-common";

/**
 * These tests will test the sql / ORM (Object-Relational-Mapping) layer through models
    To start testing: at server directory docker-compose up -d db
    to run integration tests: npm run test-integ
*/
describe("dummy project", () => {
  beforeAll(async () => await initializeDb());

  test("should be same as the model", async () => {
    const projects = await projectByName("SiiliWall");
    expect(projects.every((project) => project instanceof Project));
  });

  test("should have correct name", async () => {
    const project = await mapProjectByName("SiiliWall");
    expect(project).toEqual(["SiiliWall"]);
  });

  test("should have correct name when searching by primary key", async () => {
    const { name } = await findByProjectPk(
      "9da1b35f-181a-4397-a5a5-47abced10a66"
    );
    expect(name).toEqual("SiiliWall");
  });

  test("should return correct projectId", async () => {
    const id = await mapProjectById("9da1b35f-181a-4397-a5a5-47abced10a66");
    expect(id).toContain("9da1b35f-181a-4397-a5a5-47abced10a66");
  });
});

describe("dummy board", () => {
  beforeAll(async () => await initializeDb());

  test("should return allBoards in the db", async () => {
    const boards = await boardsInTheDb();
    expect(boards.length).toBe(4);
  });

  test("should add new board in the db", async () => {
    const response = await addBoardInTheDb([
      {
        id: "9z999z99-z9zz-99z9-z9zz-z999z99z9z99",
        prettyId: "INT",
        name: "ISOPAHATAULU",
        creatorId: "8b251e01-0bec-41bf-b756-ba53c76d04e6",
        orderNumber: 5,
        ticketCount: 0,
        projectId: "9da1b35f-181a-4397-a5a5-47abced10a66",
      },
    ]);
    expect(Array.isArray(response)).toBe(true);
    const boardsAtEnd = await boardsInTheDb();
    expect(boardsAtEnd.length).toBe(5);
  });

  test("should have correct id when searching by primary key", async () => {
    const { id } = await boardInTheDb("83fa4f89-8ea1-4d1c-9fee-321daa941485");
    expect(id).toEqual("83fa4f89-8ea1-4d1c-9fee-321daa941485");
  });

  test("should return columns when searching by boardId", async () => {
    const id = await columnsOfBoardInTheDb([
      "83fa4f89-8ea1-4d1c-9fee-321daa941485",
    ]);
    expect(id).toHaveLength(4);
  });

  test("should add new column to specific board", async () => {
    const response = await addColumnForBoard([
      {
        name: "Test column",
        boardId: "83fa4f89-8ea1-4d1c-9fee-321daa941485",
        orderNumber: 5,
        id: "28d0ce05-b1e1-4c21-9c8a-87ba1b2a0531",
      },
    ]);
    expect(Array.isArray(response)).toBe(true);
    const columnsAtEnd = await columnsOfBoardInTheDb(
      "83fa4f89-8ea1-4d1c-9fee-321daa941485"
    );
    expect(columnsAtEnd.length).toBe(5);
  });

  test("should return all the columns in the db", async () => {
    const columns = await columnsInTheDb();
    expect(columns.length).toBe(17);
  });

  test("should return all tasks in the column", async () => {
    const tasks = await tasksOfColumnInTheDb(
      "f6209adb-91ca-476b-8269-328a82d05d4a"
    );
    expect(tasks.length).toBe(2);
  });

  test("should return all tasks in the db", async () => {
    const tasks = await tasksInTheDb();
    expect(tasks.length).toBe(8);
  });

  //RETURNS TOO MUCH DATA..
  //DO WE NEED TO UPDATE DUMMYDATA?
  //"createdAt": 2021-03-17T13:12:46.000Z,
  //"deletedAt": null,
  //"description": null,
  //"difficulty": null,
  //"updatedAt": 2021-03-17T13:12:46.000Z,
  /*
  test("should return task by id", async () => {
    const task = await taskById("f3f3c12d-cee0-46bf-9374-f19ba8894ad6");
    expect(task).toMatchObject({
      prettyId: "KNBN-2",
      title: "Add drag and drop function to cards",
      content: "Add drag and drop function to cards",
      storyPoints: 1,
      spentStoryPoints: 0,
      columnId: "f6209adb-91ca-476b-8269-328a82d05d4a",
      columnOrderNumber: 0,
      swimlaneOrderNumber: 1,
      id: "f3f3c12d-cee0-46bf-9374-f19ba8894ad6",
      ownerId: "654df13f-51be-4b25-8f0e-7c2f40a3a81e",
      boardId: "0f154e01-f8ba-49c8-b2dc-e374d28f7f83",
    });
  });
  */

  test("should return all tasks from column in the asc order", async () => {
    const arrayOfIds = await getTaskOrderOfColumn(
      "f6209adb-91ca-476b-8269-328a82d05d4a"
    );
    expect(arrayOfIds).toEqual([
      "f3f3c12d-cee0-46bf-9374-f19ba8894ad6",
      "d29fc7da-93a1-40ec-8c56-7b619445465b",
    ]);
  });

  test("should return all subtasks from task", async () => {
    const subtasks = await subtasksOfTaskInTheDb(
      "b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3"
    );
    expect(subtasks.length).toBe(3);
  });

  test("should return all subtasks", async () => {
    const subtasks = await subtasksInTheDb();
    expect(subtasks.length).toBe(6);
  });
});

describe("dummy board", () => {
  beforeAll(async () => await initializeDb());

  test("should relate to project", async () => {
    const projectId = await mapProjectBoardsByProjectId(
      "83fa4f89-8ea1-4d1c-9fee-321daa941485"
    );
    expect(projectId).toEqual(["9da1b35f-181a-4397-a5a5-47abced10a66"]);
  });
});

afterAll(() => afterTests());
