import {gql} from "@apollo/client"

export const ADD_LIKE = gql`
mutation addLike($idPublication: ID!){
  addLike(idPublication:$idPublication)
}
`;

export const IS_LIKE = gql`
query isLike($idPublication:ID!){
  isLike(idPublication: $idPublication)
}
`;

export const DISLIKE = gql`
mutation deleteLike($idPublication: ID!){
    deleteLike(idPublication:$idPublication)
}
`;

export const COUNT_LIKES = gql`
query countLike($idPublication:ID!){
  countLike(idPublication:$idPublication)
}
`;