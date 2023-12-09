import { gql } from "@apollo/client";

const GET_CATEGORIES = gql`
  query Get_Categories {
    getCategories {
      id
      name
      image
    }
  }
`;

export { GET_CATEGORIES };
