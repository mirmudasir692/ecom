import { gql } from "@apollo/client";

// this below function is used for partner to get all the products
const GET_PRODUCTS = gql`
  query GetProducts($pagenum: Int!) {
    partnerProducts(page: $pagenum) {
      id
      title
      image
      count
      inStock
      category{
        id
        name
      }
    }
  }
`;
// this will used to get the single product
export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    partnerProduct(id: $productId) {
      id
      title
      image
      description
      count
      inStock
      price
      category{
        id
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($page: Int) {
    partnerOrders(page: $page) {
      orders {
        id
        shippingCountry
        shippingState
        shippingCity
        prepaid
        productPrice
        phoneNum
        zipcode
        orderedOn
        orderId
        delivered
        deliver

        product {
          title
          image
        }
      }
      hasNext
      hasPrevious
      totalPages
    }
  }
`;
export default GET_PRODUCTS;
