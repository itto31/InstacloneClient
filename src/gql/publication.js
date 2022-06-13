import {gql} from "@apollo/client";

export const PUBLISH = gql`
    mutation publish($file: Upload){
    publish(file: $file){
    status
    urlFile
    }
    }
`;

export const GET_PUBLICATION = gql`
query getPublication($username: String!){
  getPublication(username: $username){
    id
    idUser
    file
    typeFile
    createAt
  }
}
`;

export const GET_PUBLICATIONS_FOLLOWEDS = gql`
query getPublicationFolloweds{
  getPublicationFolloweds{
    id,
    idUser {
      name
      username
      avatar
    }
    file
    typeFile
    createAt
  }
}
`;