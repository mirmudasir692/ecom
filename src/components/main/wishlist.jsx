import { useQuery } from "@apollo/client"
import { GetWishList } from "../../graphql/generalQuery"
import { useEffect, useState } from "react"
import Product from "../main/wishProduct"
import Spinner from '../banners/spinner'
import { useNavigate } from "react-router-dom"

function WishList(){
    const [products,setProducts] = useState([])
    const {data,error,loading,refetch} = useQuery(GetWishList)
    const navigate = useNavigate()

    useEffect(()=>{
        if(loading){
            console.log("data is being fetched")
        }
        if(error){
            console.log("an error occurred",error)
        }
        if(data){
            setProducts((prevProducts) => [
                // ...(prevProducts || []),
                ...data.wishlistProducts.map((wishlistItem) => wishlistItem.product),
              ]);
          
        }
    },[error,data,loading])
    

    // refetch the data when navigated to this

    useEffect(()=>{
        const RefetchData=async()=>{
            await refetch()
        }
        RefetchData()
    },[navigate])
   
    return (
        <>
        <h1 className="mt-20 font-light text-5xl pb-10 max-sm:pb-0">Wish List <span className="text-pink-800"><i className="fa-solid fa-heart"></i></span></h1>
        {loading && (
            <Spinner/>
        )}
        <div className="grid grid-cols-3 ml-32 max-sm:mt-6 max-sm:flex max-sm:flex-col max-sm:ml-auto mr-auto gap-y-5">
          {products.map((product)=>(
            <div key={product.id}>
               <Product product={product}/>
            </div>
          ))}
        </div>
        </>
    )
}
export default WishList