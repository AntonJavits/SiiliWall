import { gql } from '@apollo/client'

export const BOARD_BY_ID = gql`
  query boardById($boardId: ID!) {
    boardById(id: $boardId) {
      id
      projectId
      prettyId
      name
      columnOrder
      swimlaneOrder
      ticketCount
      columns {
        id
        name
        hidden
        ticketOrder {
          ticketId
          type
        }
        board {
          id
          columnOrder
        }
        tasks {
          id
          prettyId
          title
          storyPoints
          deletedAt
          spentStoryPoints
          subtasks{
            id
            deletedAt
            column{
              id
            }
          }
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
          description
          swimlaneOrderNumber
          column {
            id
          }
          board {
            id
          }
        }
        subtasks {
          id
          prettyId
          name
          content
          deletedAt
          storyPoints
          spentStoryPoints
          column {
            id
            hidden
            name
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
  }
`
export const BOARDS_RELATED_BY_PROJECT_ID = gql `
query boardsRelatedByProjectId($boardId: ID!) {
  boardsRelatedByProjectId(id: $boardId) {
      id
      projectId
      name
  }
}
`

export const ADD_BOARD = gql`
  mutation addBoard(
    $name: String!
    $prettyId: String!
    $eventId: ID!
    $projectId: ID!
  ) {
    addBoard(
      name: $name
      prettyId: $prettyId
      eventId: $eventId
      projectId: $projectId
    ) {
      id
      name
      prettyId
    }
  }
`
export const BOARD_ADDED = gql`
  subscription boardAdded($projectId: ID!, $eventId: ID!) {
    boardAdded(projectId: $projectId, eventId: $eventId) {
      mutationType
      board {
        id
        name
        orderNumber
        prettyId
      }
    }
  }
`

export const DELETE_BOARD = gql`
  mutation deleteBoard(
    $id: ID!
    $name: String!
    $projectId: ID!
    $eventId: ID!
  ) {
    deleteBoard(id: $id, name: $name, projectId: $projectId, eventId: $eventId)
  }
`

export const BOARD_REMOVED = gql`
  subscription boardRemoved($projectId: ID!, $eventId: ID!) {
    boardRemoved(projectId: $projectId, eventId: $eventId) {
      removeType
      removeInfo {
        boardId
        projectId
      }
    }
  }
`

export const ARCHIVE_BOARD = gql`
  mutation archiveBoard($boardId: ID!, $projectId: ID!, $eventId: ID!) {
    archiveBoardById(boardId: $boardId, projectId: $projectId, eventId: $eventId)
  }
`

export const ARCHIVED_BOARDS = gql`
query archivedBoards($projectId: ID!) {
  archivedBoards(id: $projectId) {
    id
    name
    orderNumber
    ticketCount
  }
}
`
export const RESTORE_BOARD_BY_ID = gql`
  mutation restoreBoardById($boardId: ID!,$projectId: ID!, $eventId: ID!){
    restoreBoardById(boardId: $boardId, projectId: $projectId, eventId: $eventId)
  }
  `
export const ALL_BOARDS = gql`
  query {
    allBoards {
      id
      name
      projectId
    }
  }
`

