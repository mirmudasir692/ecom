import { useParams } from "react-router-dom";
import Product from "./product";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import GetProducts from "../../graphql/generalQuery";
import Pagination from "./pagination";

function Products(){
    const category = useParams().category_id
    console.log("this is category ", category)
    const [products,setProducts] = useState([])
    const [pages,setPages] = useState(null)
    const [hasNextBtn,setHasNextBtn] = useState(true)
    const [hasPrevBtn,setHasPrevBtn] = useState(true)
    const [page,setPage] = useState(1)
    const {loading,error,data,refetch} = useQuery(GetProducts,
            {
                variables:{
                    category_id:category,
                    page:page
                }
            }
        )

        // when the page number would be changed it will be called
    useEffect(()=>{
        const refetchData=async()=>{
            await refetch()
        }
        refetchData()
    },[page])
    useEffect(()=>{
        if(loading){
            console.log("data is being fetched")
        }
        if(error){
            console.log("an error occurred",error)
        }
        if(data){
            console.log(data)
            setHasNextBtn(data.products.hasNext)
            setHasPrevBtn(data.products.hasPrevious)
            setProducts(data.products.products)
            setPage(data.products.page)
            setPages(data.products.totalPages)

            
        }
    },[loading,error,data,refetch])
    // update the page count
    const LoadNextBtn=()=>{
        if(hasNextBtn){
            setPage((prevPage)=>prevPage + 1)
        }
    }

    const LoadPreviousBtn=()=>{
        if(hasPrevBtn){
            setPage((prevPage)=>prevPage - 1)
        }
    }
    return (
        
        <>
        <div>
        <div className="grid grid-cols-4 mt-16 gap-28 grid-rows-4 max-md:flex max-md:flex-col">
       {
            products.map((product)=>(
                <div key={product.id}>
                    <Product product={product}/>
                </div>
            ))
        }
        
       </div>
            <div>
                <Pagination hasNext={hasNextBtn} hasPrev={hasPrevBtn} handleNext={LoadNextBtn} handlePrev={LoadPreviousBtn} page={page} pages={pages}/>
            </div>
        </div>
        </>
    )
}
export default Products
