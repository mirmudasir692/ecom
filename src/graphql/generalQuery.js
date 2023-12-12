import { gql } from "@apollo/client";

const GetProducts = gql`
  query GetProducts($page: Int, $category_id: ID, $query: String) {
    products(page: $page, categoryId: $category_id, query: $query) {
      products {
        id
        image
        title
        rating
        price
        trusted
      }
      hasNext
      totalPages
      hasPrevious
      page
    }
  }
`;
// this is for checking out the product
export const CheckoutProduct = gql`
  query CheckoutProduct($product_id: ID!) {
    product(id: $product_id) {
      id
      title
      price
      trusted
      rating
      inStock
      image
      description
      supplier {
        email
        companyName
        companyLogo
        trusted
      }
    }
  }
`;
// below one is for getting the wishlisted products of the user
export const GetWishList = gql`
  query GetWishList {
    wishlistProducts {
      product {
        id
        image
        title
        rating
        price
        trusted
      }
    }
  }
`;

export const OrderProduct = gql`
  query OrderProduct($product_id: ID!) {
    product(id: $product_id) {
      id
      title
      price
      inStock
      image
    }
  }
`;

export const GetOrders = gql`
  query GetOrders {
    getOrders {
      id
      shippingCountry
      shippingState
      shippingCity
      zipcode
      orderId
      orderedOn
      productPrice
      quantity
      prepaid
      deliver
      product {
        title
        image
      }
      delivered
    }
  }
`;

export const GetOrderId = gql`
  query GetOrderId {
    getOrders {
      id
      orderId
    }
  }
`;

// this for getting the cart list

export const GETCARTLIST = gql`
  query GetCartList {
    getCartList {
      cartItems {
        id
        quantity
        product {
          id
          title
          inStock
          image
          price
        }
      }
      totalCost
    }
  }
`;

export default GetProducts;
