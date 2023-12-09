import AxiosInstance from "../../Axios/AxiosInstance";

//  we have used graphql for get request...

const DeleteCartItem = async (cartitem_id) => {
  try {
    const response = await AxiosInstance.delete(
      `services/cart/?cart_item_id=${cartitem_id}`
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const AddToCart = async (product_id, setCartSuccess) => {
  /*
    this method is for adding the product into the cart of the user...
    using api
    */

  try {
    const data = {
      product_id: product_id,
    };
    const response = await AxiosInstance.post("services/cart/", data);
    console.log(response.status);
    if (response.status === 200) {
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2000);
    }
  } catch (error) {
    console.log("an error occurred ", error);
  }
};

const UpdateCartItem = async (cartitemid, quantity) => {
  try {
    const data = {
      cart_item_id: cartitemid,
      quantity: quantity,
    };
    const response = await AxiosInstance.patch("services/cart/",data);
    return response;
  } catch (error) {
    console.log("an error occurred while updating the cart item");
  }
};

export { DeleteCartItem, AddToCart, UpdateCartItem };
