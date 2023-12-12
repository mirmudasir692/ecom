import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckoutProduct } from "../../graphql/generalQuery";
import BannerComp from "../banners/success";
import ADD_TO_WISHLIST from "../../graphql/mutation/mutation";
import Modal from "../banners/modal";
import { AddToCart } from "../../api/cartlist/cartlist";
import BaseEndUrl from "../../../config/config"


function CheckOutProduct() {
  const { product_id } = useParams(); // product id
  const [product, setProduct] = useState(null); // product state
  const [success, setSuccess] = useState(false); // for showing the success banner after the mutation
  const [cartSuccess, setCartSuccess] = useState(false);
  const DisappearModal = () => {
    setSuccess(false);
  };
  const DisappearCartModal = () => {
    setCartSuccess(false);
  };

  const HandleAddToCart = async (product_id) => {
    await AddToCart(product_id, setCartSuccess);
  };

  const { loading, data, error, refetch } = useQuery(CheckoutProduct, {
    variables: { product_id: product_id },
  }); // this is for showing the product in the checkout

  const [addToWishList, { data1 }] = useMutation(ADD_TO_WISHLIST);
  const AddToWishLater = async () => {
    // this will handle the AddToWishLater frontend logic using apollo client
    try {
      const response = await addToWishList({
        variables: { product_id: product_id },
      });
      console.log(response.data.addToWishlist.success);
      if (response && response.data.addToWishlist.success === true) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.log("this is error", error);
    }
  };
  useEffect(() => {
    if (loading) {
      console.log("data is being fetched");
    }
    if (error) {
      console.log("An error occured", error);
    }
    if (data) {
      setProduct(data.product); // store the product in the react state
    }
  }, [error, data, loading, refetch]);

  return (
    <>
      {success && (
        <Modal onClose={DisappearModal} content="added to wish list" />
      )}
      {cartSuccess && (
        <Modal onClose={DisappearCartModal} content="added to cart" />
      )}
      <div className="mt-20">
        <div className="flex flex-row gap-10 max-sm:flex-col">
          <div className="border-b border-gray-800 pb-10 ml-auto">
            <div className="px-10 border border-gray-400 rounded-md">
              <img
                className="w-96 h-96"
                src={product && `${BaseEndUrl}media/${product.image}`}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center gap-5 mt-5">
              <div className="flex flex-row justify-evenly gap-5">
                <button
                  type="button"
                  onClick={() => HandleAddToCart(product_id)}
                  className="border border-purple-900 px-10 py-3 font-extrabold rounded-md text-purple-900 max-sm:px-3"
                >
                  <span className="pr-2">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </span>
                  Add to Cart
                </button>

                <button
                  onClick={AddToWishLater}
                  className="border border-purple-900 px-10 py-3 font-extrabold rounded-md text-purple-900 max-sm:px-3"
                >
                  <span className="px-2">
                    <i className="fa-solid fa-heart"></i>
                  </span>{" "}
                  Wish later
                </button>
              </div>
              <Link
                to={`/order/${product && product.id}`}
                className="border border-purple-900 px-10 py-3 font-extrabold rounded-md bg-purple-900 text-white w-1/2 ml-auto mr-auto max-sm:px-1"
              >
                <span className="pr-2 ">
                  <i className="fa-solid fa-angles-right"></i>
                </span>
                Buy Now
              </Link>
            </div>
          </div>
          <div className=" w-96 max-sm:w-80">
            <div className="flex flex-col justify-start text-left gap-5 max-sm:w-80">
              <div className="flex flex-col mr-auto p-5 border border-gray-400 w-full gap-2 rounded-lg">
                <p className="font-extrabold text-gray-500">
                  {product && product.title}
                </p>
                <p className="text-2xl font-medium">
                  ₹ {product && product.price}
                </p>
                <p className="bg-green-900 w-16 text-white font-extrabold flex justify-center gap-1 rounded-full">
                  {product && product.rating}
                  <span>
                    <i className="fa-solid fa-star"></i>
                  </span>
                </p>
                <p className="text-sm border bg-slate-50 w-fit p-1 rounded-lg text-gray-500">
                  Free Delivery
                </p>
                <p className="text-xl">
                  {product && product.inStock ? (
                    <span className="text-green-900">
                      <i class="fas fa-check-circle"></i>
                    </span>
                  ) : (
                    <span className="text-red-700">
                      <i class="fas fa-check-circle"></i>
                    </span>
                  )}
                </p>
              </div>
              <div className="border border-gray-400 rounded-lg p-5">
                <h2 className="text-black font-extrabold text-2xl  pb-5">
                  Product Details
                </h2>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Name : {product && product.title}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Category : {product && product.category}
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Description :{" "}
                    <span className="font-light">
                      {product && product.description}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border border-gray-400 rounded-md text-center">
                {product && product.trusted && (
                  <span className="flex justify-center gap-2 text-sm px-5 py-5">
                    <span className="text-xl">
                      <i class="fa-solid fa-thumbs-up"></i>
                    </span>
                    <span className=" text-sm font-semibold">
                      Best quality products from trusted suppliers
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOutProduct;
