import { useState } from "react"
import { Link } from "react-router-dom"

function Product({ product }){
    const [option,setOption] = useState(false) // it handles the visibility of the options bar


    return (
        <>
   
        <Link to={`/product/${product.id}`}>
        <div className="relative border border-gray-400 rounded-lg p-2 w-80 product max-sm:mr-auto max-sm:ml-auto max-sm:w-full">
            <div className="relative">
         
            <img className=" w-80 h-48 rounded-md ml-auto mr-auto" src={`https://mudasir12345.pythonanywhere.com/media/${product.image}`} alt="" />
            </div>
            <div className="flex flex-col text-start gap-3">
                <p className="text-2xl text-gray-500">{product.title}</p>
                <p className="font-extrabold text-2xl">₹{product.price} <span className=" text-sm font-light text-gray-500">onwards</span></p>
                <p className="text-sm bg-gray-300 w-28 text-center rounded-lg">Free Delivery</p>


             <p className="flex justify-between">
             <p className="w-20 bg-green-700 flex justify-center gap-2 rounded-2xl text-white"><span className="font-extrabold">{product.rating}</span><span><i class="fa-solid fa-star"></i></span>
                </p>
                <span>{product.trusted && <span className="font-extrabold text-sm text-red-500 bg-red-200 px-2 py-1 rounded-lg">Trusted</span>}</span>
             </p>

            </div>
            
        </div>
        </Link>
        </>
    )
}

export default Product
