import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OrderProduct } from "../../graphql/generalQuery"
import AxiosInstance from '../../Axios/AxiosInstance'
import Spinner from "../banners/spinner"
import OrderConfirmed from "../banners/orderConfirmed"


function PlaceOrder(){
    const [ordering, setOrdering] = useState(false) // while order show spinner
    const [product ,setProduct] = useState("")
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [mobile,setMobile] = useState("")
    const [zipCode,setZipCode] = useState(0)
    const [quantity,setQuantity] = useState(1)
    const [confirmed,setConfirmed] = useState(false)
    const [order_id,setOrder_id] = useState("")

    const [user,setUser] = useState(null)
 
    const GetUserInfo=async()=>{
        try{
            const response = await AxiosInstance.get("accounts/order_user/")
            console.log(response.data)
            setUser(response.data)
        
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        GetUserInfo()
    },[])
    useEffect(()=>{
        if(user){
        setCountry(user.country)
        setState(user.state)
        setCity(user.city)
        setMobile(user.mobile)
        console.log("this is user ", user)
    }
},[user])



const {product_id} = useParams()   // get the product id
const {error,data,loading,refetch} = useQuery(OrderProduct,{   // use the hook useQuery to get the product info
    variables:{product_id:product_id}
})
useEffect(()=>{
    if(data){
        setProduct(data.product)
    }
    if(loading){
        console.log("it is loading")
    }
    if(error){
        console.log("it is error", error)
    }
},[error,loading,data])




const HandleFormSubmit=async(e)=>{
    e.preventDefault()
    const data={
        'shipping_country':country,
        "shipping_state": state,
        "shipping_city": city,
        "zipcode":zipCode,
        "phone_num":mobile,
        "product_id":product_id,
        
    }
    try{
        
            setOrdering(true)
            const response =await AxiosInstance.post("order/",data)
            if(response.status === 200){
                setConfirmed(true)
                setOrder_id(response.data.order_id)
                setCountry("")
                setState("")
                setCity("")
                setMobile("")
                setZipCode(0)
                setQuantity(0)
            }
            setOrdering(false)
        }catch(error){
            console.log(error)
            setOrdering(false)
        }
    }



    return (
        <>
  <div className="mt-20">
    {ordering && <Spinner/>}
    {confirmed && <OrderConfirmed order_id={order_id && order_id}/>}
  <h1 className="text-3xl font-bold pb-5">Enter the details to place your order</h1>
        <div className=" ml-auto mr-auto flex w-3/4 max-sm:flex-col gap-10">
            <div className="flex flex-col bg-white p-10 rounded-lg">
            <img className="w-80 h-96 rounded-lg" src={product && `http://127.0.0.1:8000/media/${product.image}`} alt="" />

            <h3 className="text-2xl font-light p-3 mr-auto ml-auto">{product && product.title}</h3>
            <h2 className="font-bold text-gray-500 mr-auto ml-auto p-3">Total Price : {product && product.price}</h2>
            <h4 className="text-xl font-semibold text-gray-500 mr-auto ml-auto">Quantity : <span className="font-semibold">1 X</span></h4>
            <p>{product && product.inStock}</p>
            </div>
            <form action="" onSubmit={HandleFormSubmit}>
            <div className="flex flex-col gap-10 ml-auto mr-auto bg-white px-5 py-10 rounded-lg max-sm:w-80 h-full">
                <input className="w-96  bg-transparent rounded-lg opacity-1 max-sm:w-52 ml-auto mr-auto" type="text" name="country" placeholder="Enter Your Country Name" id="" value={country || ""} onChange={(e)=>setCountry(e.target.value)} required />
                <input type="text" className="w-96  bg-transparent rounded-lg max-sm:w-52  ml-auto mr-auto" name="state" id="" placeholder="Enter Your State Name" value={state || ""} onChange={(e)=>setState(e.target.value)} required />
                <input type="text" className="w-96  bg-transparent rounded-lg max-sm:w-52  ml-auto mr-auto" name="city" id=""  placeholder="Enter Your City Name" value={city || ""} onChange={(e)=>setCity(e.target.value)} required />
                <input type="tel" className="w-96  bg-transparent rounded-lg max-sm:w-52  ml-auto mr-auto" name="" placeholder="Enter Your Mobile number" id="" value={mobile || ""} onChange={(e)=>setMobile(e.target.value)} required />
                <input type="tel" className="w-96  bg-transparent rounded-lg max-sm:w-52  ml-auto mr-auto" name="" placeholder="Enter ZipCode" id="" value={zipCode || ""} onChange={(e)=>setZipCode(e.target.value)} required />
                <input type="number" placeholder="Quantity" className="w-96  bg-transparent rounded-lg max-sm:w-52  ml-auto mr-auto"  value={quantity} onChange={(e)=>setQuantity(e.target.value)} name="" id="" />
                
            <button type="submit" className="border border-black ml-auto mr-auto px-8 py-3 rounded-lg text-green-500 hover:bg-gray-300 text-sm font-bold flex gap-1"><span className="text-green-400"><i className="fa-solid fa-circle-check"></i></span>CONFIRM</button>
            </div>
            </form>
        </div>
  </div>
        </>
    )
}
export default PlaceOrder