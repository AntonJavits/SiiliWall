import Project, { ProjectModelStatic } from "./Project"
import Board, { BoardModelStatic } from "./Board"
import Color, { ColorModelStatic } from "./Color"
import ColorSubtask, { ColorSubtaskModelStatic } from "./ColorSubtask";
import ColorTask, { ColorTaskModelStatic } from "./ColorTask";
import Column, { ColumnModelStatic } from "./Column";
import Story, { StoryModelStatic } from "./Story";
import Subtask, { SubtaskModelStatic } from "./Subtask";
import Task, { TaskModelStatic } from "./Task";
import User, { UserModelStatic } from "./User";
import UserStory, { UserStoryModelStatic } from "./UserStory";
import UserSubtask, {UserSubtaskModelStatic} from "./UserSubtask";
import UserTask, { UserTaskModelStatic } from "./UserTask";

export default {
    Project,
    Board,
    Color,
    ColorSubtask,
    ColorTask,
    Column,
    Story,
    Subtask,
    Task,
    User,
    UserStory,
    UserSubtask,
    UserTask,
}

export interface ModelType {
    Project: ProjectModelStatic,
    Board: BoardModelStatic,
    Color: ColorModelStatic,
    ColorSubtask: ColorSubtaskModelStatic,
    ColorTask: ColorTaskModelStatic,
    Column: ColumnModelStatic,
    Story: StoryModelStatic,
    Subtask: SubtaskModelStatic,
    Task: TaskModelStatic,
    User: UserModelStatic,
    UserStory: UserStoryModelStatic,
    UserSubtask: UserSubtaskModelStatic,
    UserTask: UserTaskModelStatic
}
