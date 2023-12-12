import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_WISHITEM } from "../../graphql/mutation/mutation";
import BaseEndUrl from "../../../config/config"


function Product({ product }) {
  const [option, setOption] = useState(false); // it handles the visibility of the options bar
  const [isDeleted, setIsDeleted] = useState(false); // this is for deleting the product..

  const [deleteWishItem, { data }] = useMutation(DELETE_WISHITEM);
  const HandleDeleteWishListItem = async (product_id) => {
    try {
      const response = await deleteWishItem({
        variables: { product_id: product_id },
      });
      console.log(response.data.deleteWishedItem.success);
      if (response.data.deleteWishedItem.success) {
        setIsDeleted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isDeleted) {
    return null;
  }
  return (
    <>
      <Link to={`/product/${product.id}`}>
        <div className="relative border border-gray-400 rounded-lg p-2 w-80 product max-sm:mr-auto max-sm:ml-auto max-sm:w-full">
          <div className="relative">
            <img
              className=" w-80 h-48 rounded-md ml-auto mr-auto"
              src={`${BaseEndUrl}media/${product.image}`}
              alt=""
            />
          </div>
          <div className="flex flex-col text-start gap-3">
            <p className="text-2xl text-gray-500">{product.title}</p>
            <p className="font-extrabold text-2xl">
              ₹{product.price}{" "}
              <span className=" text-sm font-light text-gray-500">onwards</span>
            </p>
            <p className="text-sm bg-gray-300 w-28 text-center rounded-lg">
              Free Delivery
            </p>

            <p className="flex justify-between">
              <p className="w-20 bg-green-700 flex justify-center gap-2 rounded-2xl text-white">
                <span className="font-extrabold">{product.rating}</span>
                <span>
                  <i class="fa-solid fa-star"></i>
                </span>
              </p>
            </p>
          </div>
        </div>
      </Link>
      <button
        className="relative left-28 bottom-10 z-10"
        onClick={() => HandleDeleteWishListItem(product.id)}
      >
        <span>
          <i className="fa-solid fa-trash"></i>
        </span>
      </button>
    </>
  );
}

export default Product;
