import { gql } from '@apollo/client'

export const PROJECT_BY_ID = gql`
  query projectById($projectId: ID!) {
    projectById(id: $projectId) {
      id
      name
      boards {
        id
        name
        orderNumber
      }
    }
  }
`
export const BOARDS_BY_PROJECT_ID = gql`
  query boardsByProjectId($projectId: ID!) {
    boardsByProjectId(id: $projectId) {
      id
      name
      orderNumber
      ticketCount
    }
  }
`
export const ALL_PROJECTS = gql`
  query {
    allProjects {
      id
      name
      orderNumber
    }
  }
`

export const ARCHIVED_PROJECTS = gql`
  query {
    archivedProjects {
      id
      name
      orderNumber
    }
  }
`

export const ADD_PROJECT = gql`
  mutation addProject($name: String!) {
    addProject(name: $name) {
      id
      name
    }
  }
`

export const ARCHIVE_PROJECT = gql`
  mutation archiveProject($projectId: ID!, $eventId: ID!) {
    archiveProjectById(projectId: $projectId, eventId: $eventId)
  }
`

export const PROJECT_REMOVED = gql`
  subscription projectRemoved($projectId: ID!, $eventId: ID!) {
    projectRemoved(projectId: $projectId, eventId: $eventId) {
      removeType
      removeInfo {
        projectId
      }
    }
  }
`

export const RESTORE_PROJECT_BY_ID = gql`
  mutation restoreProjectById($projectId: ID!, $eventId: ID!) {
      restoreProjectById(projectId: $projectId, eventId: $eventId)
    }
`
