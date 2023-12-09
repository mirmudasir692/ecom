import { useEffect, useState } from "react"
import AxiosInstance from '../../Axios/AxiosInstance'
import Spinner from "../banners/spinner"
import OrderConfirmed from "../banners/orderConfirmed"
import { useNavigate } from "react-router-dom"


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


    const navigate = useNavigate() // initailize navigator

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
    }
},[user])

const HandleFormSubmit=async(e)=>{
    e.preventDefault()
    const data={
        'shipping_country':country,
        "shipping_state": state,
        "shipping_city": city,
        "zipcode":zipCode,
        "phone_num":mobile,
        "use_cart":true
    }
    try{
        
            setOrdering(true)
            const response =await AxiosInstance.post("order/order_cart/",data)
            if(response.status === 200){
                setConfirmed(true)
                setOrder_id(response.data.order_id)
                setCountry("")
                setState("")
                setCity("")
                setMobile("")
                setZipCode(0)
                setQuantity(0)
                navigate("/")
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
        <div className=" ml-auto mr-auto flex w-3/4 max-sm:flex-col gap-10">
           
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