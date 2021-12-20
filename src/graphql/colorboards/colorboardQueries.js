import { gql } from '@apollo/client'


export const ALL_EPICCOLORS = gql`
    query {
        allEpicColors {
            colorId
            boardId
            name
        }
    }
`

export const ADD_EPICCOLORS = gql`
mutation addEpicColors($colorId: ID!, $boardId: ID!, $name: String!) {
    addEpicColors(colorId: $colorId, boardId: $boardId, name: $name) {
        colorId
        boardId
        name
    }
}`