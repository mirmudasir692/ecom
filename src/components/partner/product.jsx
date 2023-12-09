import { Link } from "react-router-dom";
import AxiosInstance from "../../Axios/AxiosInstance";

function Product(props) {
  // pass the product from calling component\

  const product = props.product;
  return (
    <>
      <div className="flex flex-row bg-slate-100 ml-5 mr-5 rounded-3xl gap-10">
        <div>
          <img
            className="w-64 h-48 rounded-xl"
            src={`http://127.0.0.1:8000/media/${product.image}`}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-thin text-2xl text-start ">
            {product.title}
          </h2>
          <h5 className="text-start">
            <span className="text-base">Product Count</span>{" "}
            <span className="font-semibold text-gray-400 ml-2 text-xl">
              {product.count}
            </span>
          </h5>

          <h3 className="text-start">
            {" "}
            {product.inStock ? (
              <span
                className={product.inStock ? "text-green-600" : "text-red-700"}
              >
                <i class="fa-solid fa-circle"></i>
                {product.inStock ? (
                  <span> Available</span>
                ) : (
                  <span> Unavailable</span>
                )}
              </span>
            ) : null}
          </h3>

          <h6 className=" text-start">
            <span className="font-bold text-xl opacity-50">Category</span>{" "}
            {product.category.name ? (
              <span className="text-black ">{product.category.name}</span>
            ) : (
              <span>none</span>
            )}
          </h6>
        </div>
        <Link
          to={`edit_product/${product.id}/`}
          className="ml-auto mr-5 h-fit text-2xl mt-2"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </Link>
      </div>
    </>
  );
}
export default Product;
