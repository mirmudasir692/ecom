import { gql } from "@apollo/client"
const GET_USER_PROFILE = gql`
query GetUserProfile{
    getUserProfile{
      id
      Name
      email
      country
      state
      city
      gender
      mobile
      alternativeMobile
    }
  }
`


export { GET_USER_PROFILE }