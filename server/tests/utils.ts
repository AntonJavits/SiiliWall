import Project from "../src/models/Project";
import Board from "../src/models/Board";
import Column from "../src/models/Column";
import Subtask from "../src/models/Subtask";
import Task from "../src/models/Task";
import Story from "../src/models/Story";
import { dbConfig } from "../src/database";
import Color from "../src/models/Color";
import ColorSubtask from "../src/models/ColorSubtask";
import ColorTask from "../src/models/ColorTask";
import User from "../src/models/User";
import UserSubtask from "../src/models/UserSubtask";
import UserStory from "../src/models/UserStory";
import Usertask from "../src/models/UserTask";

import { expressApp } from "../src/express";
import supertest from "supertest";
import dummyData from "./dummyData";
import { startServer } from "../src";

/*
  Drop all the tables, sync the models with the database,
  insert some testdata and return a promise when everything has resolved
  //TODO Remove all sequelize stuff from here and leave only graphql stuff
*/

export const initialBoards = dummyData.boards;

const startTestServer = () => {
  const app = expressApp();
  startServer(app);

  return supertest(app);
};

/**
 * For GraphQL tests
 * @param query for example: '{ allBoards { id name } }'
 */
export const testCall = async (query) =>
  await startTestServer().post("/graphql").send({ query });

export const allBoards = async () => {
  await testCall("{ allBoards { id name } }");
};
/* const taskOrderAtStart = await getTaskOrderOfColumn('7bce34e5-385b-41e6-acd3-ceb4bd57b4f6')
        const newTaskOrderArray = [
            '6e766c63-0684-4cf2-8a46-868cfaf84033',
            'b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3',
            'e12d6ed1-c275-4047-8f3c-b50050bada6d',
        ]
        expect(newTaskOrderArray).not.toStrictEqual(taskOrderAtStart)
        const response = await testCall(`mutation {
                moveTaskInColumn(newOrder: [
                    "6e766c63-0684-4cf2-8a46-868cfaf84033",
                    "b8d2d626-d6a8-4c9a-89f3-a77796d2b2f3",
                    "e12d6ed1-c275-4047-8f3c-b50050bada6d",
                ], columnId: "7bce34e5-385b-41e6-acd3-ceb4bd57b4f6") {id taskOrder}
        }`)
        // expect taskOrder in mutation's response to be the same we asked for
        expect(response.body.data.moveTaskInColumn.taskOrder).toStrictEqual(newTaskOrderArray)

        const taskOrderAtEnd = await getTaskOrderOfColumn('7bce34e5-385b-41e6-acd3-ceb4bd57b4f6')
        // expect taskOrder to have changed
        expect(taskOrderAtEnd).not.toStrictEqual(taskOrderAtStart)
        // expect the tasks of certain column to have the same
        // taskOrder the mutation was set to change it into
        expect(taskOrderAtEnd).toStrictEqual(newTaskOrderArray)
*/

/*
module.exports = {
    initializeDb,
    afterTests,
    boardsInTheDb,
    initialBoards,
    columnsOfBoardInTheDb,
    columnsInTheDb,
    storiesOfColumnInTheDb,
    storiesInTheDb,
    storyById,
    tasksOfColumnInTheDb,
    testCall,
    tasksInTheDb,
    taskById,
    getTaskOrderOfColumn,
    subtasksOfTaskInTheDb,
    subtasksInTheDb,
}
*/
