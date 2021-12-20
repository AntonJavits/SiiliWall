
import { gql } from "@apollo/client";

export const ADD_SHORTFORM = gql`
  mutation addShortForm(
    $prettyId: String!
    $projectId: ID!
  ) {
    addShortForm(
      prettyId: $prettyId
      projectId: $projectId
    ) {
      id
      prettyId
    }
  }
`;

export const SHORTFORMS_BY_PROJECTID = gql`
  query getShortFormsByProjectId($projectId: ID!) {
    ShortFormsByProjectId(projectId: $projectId) {
      id
      prettyId
    }
  }
`;