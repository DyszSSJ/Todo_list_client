import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($input: UserInput!) {
    register(input: $input) {
      email
      password
      name
    }
  }
`;

export const AUTENTICAR_USUARIO = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const CREATE_PROYECT_FORM = gql`
  mutation CreateProyect($input: CreateProyectInput!) {
    createProyect(input: $input)
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      email
      id
      name
      proyects {
        date
        description
        image
        name
        userId
        id
      }
    }
  }
`;

export const GET_PROYECT_DETAILS = gql`
  query ObtenerDetallesProyecto($idProyecto: ID!) {
    proyecto(id: $idProyecto) {
      userId
      name
      description
      image
      date
      id
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input)
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export const GET_USER_DATA = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input)
  }
`;

export const SEARCH_PROJECTS = gql`
query SearchProjects($name: String!) {
  searchProjects(name: $name) {
    id
    name
    description
    date
    image
  }
}
`;


