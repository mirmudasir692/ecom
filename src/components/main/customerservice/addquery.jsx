import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GetOrderId, GetOrders } from "../../../graphql/generalQuery"
import AxiosInstance from "../../../Axios/AxiosInstance"
import Spinner from "../../banners/spinner"
import BannerComp from "../../banners/success"

function Query(){
    const [orders, setOrders] = useState([]) // initialize the order state
    const [content, setContent] = useState("")
    const [order_id, setOrder_id] = useState("")
    const {loading,data,error} = useQuery(GetOrderId)
    const [uploading,setUploading] = useState(false)
    const [success ,setSuccess] = useState(false)
    const DisappearSuccessComp = ()=>{
        setSuccess(false)
    }
    useEffect(()=>{
        if(loading){
            console.log("it is loading")
            setUploading(true)
        }
        if(data){
            // console.log(data.getOrders)
            setUploading(false)
            setOrders(data.getOrders)
        }
        if(error){
            console.log("this is error", error)
        }
    })
    useEffect(()=>{
        console.log(orders)
    },[data,loading])


    const HandleFormSubmit=async(e)=>{
        e.preventDefault()
        const data = {
            "content":content,
            "order_id":order_id
        }
        try{
            setUploading(true)
            const response = await AxiosInstance.post("services/query/",data)
            console.log(response)
            if(response.status === 200){
                setSuccess(true)
            }
            setContent("")
            setOrder_id("")
            setUploading(false)
        }catch(error){
            console.log("an error", error)
            setUploading(false)
        }

    }
 
    return (
        <>
        <div>

  <div className="mx-auto max-w-7xl px-4">
    {(uploading || loading) && <Spinner/>}
    {success && <BannerComp bgcolor="bg-green-200" textcolor="green" content="Your Query will be answered soon" onClose={DisappearSuccessComp}/>}
    <div className="mx-auto max-w-7xl py-12 md:py-24">
      <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="px-2 md:px-12">
            <p className="text-2xl font-bold text-gray-900 md:text-4xl">
              Get in touch
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Our friendly team would love to hear from you.
            </p>
            <form action="" className="mt-8 space-y-4" onSubmit={HandleFormSubmit}>
              <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                
              
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <label
                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="phone_number"
                >
                  Issue With Order?
                </label>
               
                <select   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" value={order_id} onChange={(e)=>setOrder_id(e.target.value)}>
                <option className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" >None</option>
                    {orders.map((order)=>(
                        <option className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" key={order.id} value={order.id}>{order.orderId}</option>
                    ))}
                </select>
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <label
                  className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="message"
               
                >
                  Message
                </label>
                <textarea
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                  id="message"
                  placeholder="Enter Your Query Here"
                  cols="3"
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Send Query <span><i className="fa-solid fa-arrow-right"></i></span>
              </button>
            </form>
          </div>
        </div>
        <img
          alt="Contact us"
          className="hidden max-h-full w-full rounded-lg object-cover lg:block"
          src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&amp;auto=format&amp;fit=crop&amp;w=687&amp;h=800&amp;q=80"
        />
      </div>
    </div>
  </div>
  <hr className="mt-6" />
</div>

        </>
    )
}
export default Query