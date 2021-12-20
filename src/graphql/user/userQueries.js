/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const ALL_USERS = gql`
    query {
        allUsers {
            id
            userName
            projectId
        }
    }
`

export const ARCHIVED_USERS = gql`
    query {
        archivedUsers {
            id
            userName
            projectId
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($userName: String!, $projectId: String!) {
        addUser(userName: $userName, projectId: $projectId) {
            id
            userName
            projectId
        }
    }
`
export const ARCHIVE_USER = gql`
    mutation archiveUser($id: String! $userName: String!) {
        archiveUser(id: $id, userName: $userName) {
            id
            userName
        }
    }
`
export const RESTORE_USER = gql`
    mutation restoreUserById($id: String!) {
      restoreUserById(id: $id) {
            id
        }
    }
`