import { useQuery } from "@apollo/client"
import GetProducts from "../../graphql/generalQuery"
import { useEffect, useRef, useState } from "react"
import Product from "./product"
import { Link } from 'react-router-dom'

function CategoryProducts({ category }){
    const [page,setPage] = useState(1)
    const [products,setProducts] = useState([])
    const [hasNext,setHasNext] = useState(false)
    console.log(category.id)

    const {loading,error,data,refetch} = useQuery(GetProducts,{
        variables:{page : page,category_id : category.id}
    })
    useEffect(()=>{
        if(loading){
            console.log("data is loading")
        }
        if(error){
            console.log("an error ", error)
        }
        if(data){
            console.log("data :", data)
            setProducts(data.products.products)
            setHasNext(data.products.hasNext)
        }

    },[data,loading,error,refetch])
    const containerRef=useRef(null)
    const HandleScroll =(e)=>{
        const container = containerRef.current;
        if(container){
            container.scrollTo({
                left:container.scrollLeft + e.deltaY,
                behavior:"smooth"
            })
        }
    }
    return (
        <>
        <h1 className="text-start text-3xl font-extrabold pb-8">{category.name}</h1>
     <div className="flex max-md:flex-col gap-10">
     <div className="flex gap-5 max-md:flex-col"
        ref={containerRef}
        onWheel={HandleScroll}
        >
            {products.map((product)=>(
                <Product key={product.id} product={product}/>
            ))}
        </div>
        <div className="ml-10 mt-auto mb-auto">
          {hasNext && (
              <Link to={`products/${category}`} className="text-xl font-bold bg-slate-500 px-6 py-3 rounded-lg text-white hover:bg-gray-400 hover:text-black">
              More
          </Link>
          )}
        </div>
     </div>
        </>
    )
}

export default CategoryProducts