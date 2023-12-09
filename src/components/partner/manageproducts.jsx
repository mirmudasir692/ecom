import { Link, useNavigate } from "react-router-dom"
import { useQuery,gql } from "@apollo/client"
import GET_PRODUCTS from "../../graphql/query"
import { useCallback, useEffect, useState } from "react"
import Product from "./product"
import Spinner from "../banners/spinner"
import  client from "../../graphql/partner/apollo"

/*
we have to add the filter feature here... but i left for now...
*/

function ManageProduct(){
    const [spin,setSpin] = useState(false)
    const [reSpin,setRespin] = useState(false)
    const [products,setProducts] = useState([])
    const navigate = useNavigate()
    const [hasnext,setHasNext] = useState(true)
    const [currentPage,setCurrentPage] = useState(1)
    const [inStock,setInstock] = useState(false)  // this is for filtering products whether in stock or out of stock

        const { loading , error ,data,refetch } = useQuery(GET_PRODUCTS,{
            variables: { pagenum : currentPage},
            client :client
            // pass the parameters to the Query
        })
        
        useEffect(()=>{
            if(loading){
                setSpin(true)
            }
    
            if(error){
                setSpin(false)

            }
            if(data){
                const hasDuplicates = data.partnerProducts.some((newProduct) =>
            products.some((existingProduct) => existingProduct.id === newProduct.id)
            );
                if(!hasDuplicates){
                    setProducts((prevproducts)=>[...prevproducts,...data.partnerProducts])
                }
                else if(hasDuplicates){
                    setHasNext(false)
                }
            }
            setSpin(false)
            setRespin(false)
        },[data,refetch,loading,error])
        useEffect(()=>{
            const refetchData = async()=>{
                await refetch()
            }
            refetchData()
        },[refetch,navigate,currentPage])
    

        const HandlePullUp = ()=>{    // this function hadles the Pull up pagination 
            if(hasnext){
                setSpin(true)
                setCurrentPage((prevPage)=> prevPage + 1)
                setRespin(true)
            }
        }
        useEffect(()=>{
            console.log(inStock) // it is working, means filter value is setting false to true and true to false
        },[inStock])
    return (
        <>
          <div>
          <div>
              <Link to="add_product" className="bg-slate-950 ml-auto flex justify-center font-light rounded-lg text-white w-24 text-sm py-2 hover:bg-slate-600 mt-5 mr-1 mb-5">Add Products</Link>
              
            </div>
           <div className="overflow-y-scroll h-screen scroll flex flex-col gap-10" onScroll={(e)=>{
            const { scrollTop,clientHeight, scrollHeight } = e.currentTarget;
            if(scrollTop + clientHeight === scrollHeight){
                HandlePullUp()
            }
           }}>  
            {spin && <Spinner/>}
            <div className="mr-auto">
            <div>
                <select value={inStock ? 'true' : 'false'} onChange={(e)=>setInstock(e.target.value === 'true')}>
                    <option value="true">in stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>
        </div>
           {products && products.map((product)=>(
                <Product key={product.id} product={product} />
            ))}
           </div>
           {reSpin && <Spinner/>}
          </div>
        </>
    )
}

export default ManageProduct