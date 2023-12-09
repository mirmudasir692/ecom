import { gql } from "@apollo/client";

const ADD_TO_WISHLIST = gql`
  mutation AddToWishList($product_id: ID!) {
    addToWishlist(productId: $product_id) {
      success
    }
  }
`;
export const DELETE_WISHITEM = gql`
mutation DeleteWishItem($product_id:ID!){
    deleteWishedItem(productId:$product_id){
      success
  }
}
`;
export default ADD_TO_WISHLIST;
