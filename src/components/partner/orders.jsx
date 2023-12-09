import { useQuery } from "@apollo/client"
import { GET_ORDERS } from "../../graphql/query"
import { useEffect, useState } from "react"
import OrderProduct from "./orderProduct"
import Pagination from "../main/pagination"
import Spinner from "../banners/spinner"

function Orders(){
    const [page,setPage] = useState(1)
    const [orders,setOrders] = useState([])
    const [hasNext,setHasNext] = useState(false)
    const [hasPrev, setPrev] = useState(false)
    const [pages, setPages] = useState(1)
    const {loading,data,error,refetch} = useQuery(GET_ORDERS,
        {
            variables:{page:page}
        }
        )
        useEffect(()=>{
            if(loading){
                <Spinner/>
            }
            if(error){
                console.log("an error occured ", error)
            }
            if(data){
                setOrders(data.partnerOrders.orders)
                console.log(data.partnerOrders.hasNext)
                setHasNext(data.partnerOrders.hasNext)
                console.log(data.partnerOrders)
                setPrev(data.partnerOrders.hasPrevious)
                setPages(data.partnerOrders.totalPages)
                
            }
        },[data,error,loading])

    const handleNext= ()=>{
        if(hasNext){
            setPage((prev)=>prev+1)
        }
    }
    const handlePrev=()=>{
        if(hasPrev){
            setPage((prev)=>prev-1)
        }
    }
    useEffect(()=>{
        const refetchData=async()=>{
            await refetch()
        }
        refetchData()
    },[page])

    return (
        <>
        {loading && <Spinner/>}
        {

            orders.map((order)=>(
                <div key={order.id} className="mb-5"> 
                    <OrderProduct order={order}/>
                </div>
            ))
        }
        <Pagination handleNext={handleNext} hasNext={hasNext} hasPrev={hasPrev} handlePrev={handlePrev} page={page} pages={pages}/>
        </>
    )
}
export default Orders