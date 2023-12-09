import { useQuery } from "@apollo/client"
import { GetOrders } from "../../graphql/generalQuery"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import OrderedProduct from "./orderedProduct"
import Spinner from "../banners/spinner"

function OrderList(){
    const {loading,data,error,refetch} = useQuery(GetOrders)
    const [orders,setOrders] = useState([])
    const navigate = useNavigate()
  useEffect(()=>{
    if(loading){
        console.log("it is loading")
    }
    if(data){
        console.log(data)
        setOrders(data.getOrders)
    }
    if(error){
        console.log("it is an error", error)
    }
  },[data,loading,error])
  useEffect(()=>{
    const refetchData= async()=>{
        await refetch()
    }
    refetchData()
  },[navigate])
  useEffect(()=>{
    console.log(orders)
  },[data])
    return (
        <>
        <div className="mt-20 flex flex-col gap-10">
            {loading && (
                <Spinner/>
            )}
            <h3  className="text-3xl font-extrabold pb-5 border-b-2 border-black w-3/5 ml-auto mr-auto">Your Orders</h3>
        {orders && orders.map((order)=>(
            <div  key={order &&order.id} className="flex justify-center">
                <OrderedProduct order={order}/>
            </div>
        ))}
        </div>
        </>
    )
}
export default OrderList