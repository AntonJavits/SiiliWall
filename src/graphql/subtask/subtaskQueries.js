import { gql } from '@apollo/client'

export const ADD_SUBTASK = gql`
    mutation createSubtask($taskId: ID!, $columnId: ID!, $boardId: ID!, $name: String, $content: String!, $storyPoints: String, $spentStoryPoints: String, $ownerId: ID, $memberIds: [ID!], $colorIds: [ID!], $ticketOrder: [TicketOrderInput!], $eventId: ID!) {
        addSubtaskForTask(taskId: $taskId, columnId: $columnId, boardId: $boardId, name: $name, content: $content, storyPoints: $storyPoints, spentStoryPoints: $spentStoryPoints, ownerId: $ownerId, memberIds: $memberIds, colorIds: $colorIds, ticketOrder: $ticketOrder, eventId: $eventId) {
            id
            prettyId
            name
            content
            storyPoints
            spentStoryPoints
            column {
                id
                ticketOrder {
                    ticketId
                    type
                }
            }
            owner {
                id
                userName
            }
            task {
                id
                prettyId
                title
            }
            members {
                id
                userName
            }
            colors {
                id
                color
            }
            board {
                id
            }
        }
    }
`
export const EDIT_SUBTASK = gql`
    mutation editSubtask($id: ID!, $name: String, $content: String!, $storyPoints: String, $spentStoryPoints: String, $ownerId: ID, $oldMemberIds: [ID!], $newMemberIds: [ID!], $oldColorIds: [ID!], $newColorIds: [ID!], $eventId: ID!, $columnId: ID!) {
        editSubtask(id: $id, name: $name, content: $content, storyPoints: $storyPoints, spentStoryPoints: $spentStoryPoints, ownerId: $ownerId, oldMemberIds: $oldMemberIds, newMemberIds: $newMemberIds, oldColorIds: $oldColorIds, newColorIds: $newColorIds, eventId: $eventId, columnId: $columnId) {
            id
            name
            content
            storyPoints
            spentStoryPoints
            owner {
                id
                userName
            }
            members {
                id
                userName
            }
            colors {
                id
                color
            }
            column {
                id
            }
        }
    }
`

export const ARCHIVE_SUBTASK = gql`
    mutation archiveSubtask($subtaskId: ID!, $columnId: ID!, $boardId: ID!, $eventId: ID!) {
        archiveSubtaskById(id: $subtaskId, columnId: $columnId, boardId: $boardId, eventId: $eventId)
    }
`
export const ARCHIVED_SUBTASKS = gql `
query archivedSubTasks($boardId: ID!) {
    archivedSubTasks(id: $boardId) {
            id
            prettyId
            name
            content
            storyPoints
            spentStoryPoints
            column {
                id
                name
                hidden
                ticketOrder {
                    ticketId
                    type
                }
            }
            owner {
                id
                userName
            }
            task {
                id
                prettyId
                title
            }
            members {
                id
                userName
            }
            colors {
                id
                color
            }
            board {
                id
            }
        }
    }
`

export const ARCHIVED_SUBTASKS_BY_COLUMN_ID = gql `
query archivedSubTasksByColumnId($columnId: ID!) {
    archivedSubTasksByColumnId(id: $columnId) {
        id
        prettyId
        name
        content
        storyPoints
        spentStoryPoints
        colors {
          id
          color
        }
        owner {
          id
          userName
        }
        members {
          id
          userName
        }
        column {
          id
          name
        }
        board {
          id
        }
    }
  }
`

export const RESTORE_SUBTASK_BY_ID = gql`
mutation restoreSubTaskById($subtaskId: ID!, $boardId: ID! $eventId: ID!) {
    restoreSubTaskById(subtaskId: $subtaskId, boardId: $boardId, eventId: $eventId)
  }
`
export const DELETE_SUBTASK = gql`
    mutation deleteSubtask($subtaskId: ID!, $columnId: ID!, $boardId: ID!, $eventId: ID!) {
        deleteSubtaskById(id: $subtaskId, columnId: $columnId, boardId: $boardId, eventId: $eventId)
    }
`
export const SUBTASK_REMOVED = gql`
    subscription subtaskRemoved($boardId: ID!, $eventId: ID!) {
        subtaskRemoved(boardId: $boardId, eventId: $eventId) {
            removeType
            removeInfo {
                subtaskId,
                columnId,
                boardId
            }
        }
    }
`

export const SUBTASK_MUTATED = gql`
  subscription subtaskMutated($boardId: ID!, $eventId: ID!) {
    subtaskMutated(boardId: $boardId, eventId: $eventId) {
      mutationType
      subtask {
        id
        prettyId
        name
        content
        storyPoints
        spentStoryPoints
        column {
            id
            ticketOrder {
                ticketId
                type
            }
        }
        owner {
            id
            userName
        }
        task {
            id
            prettyId
            title
        }
        members {
            id
            userName
        }
        colors {
            id
            color
        }
        board {
            id
        }
      }
    }
  }
`
