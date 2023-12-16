import { useQuery } from "@apollo/client"
import { GETCARTLIST } from "../../graphql/generalQuery"
import { useEffect, useState } from "react"
import CartItem from "./cartitem"
import { useNavigate } from "react-router-dom"
import PlaceOrder from "./orderCartItems"

function CartList(){
    const [items,setItems] = useState([])
    const [total_cost, setTotal_Cost] = useState(0)
    const {loading,error,data,refetch} = useQuery(GETCARTLIST)
    const [order, setOrder] = useState(false)  // for showing the order component
    


    const DecreaseTotalCost=(item_price)=>{
      console.log("this is product price", item_price)
    setTotal_Cost(()=>{
      const price= total_cost - item_price
      return isNaN(price) ? 0 : price;
    })
    
    }

    const RemoveCartItem = (item_id) => {
      console.log("i am being called")
      setItems((preItems) => preItems.filter((item) => item.id !== item_id));
    };
    
    const navigate = useNavigate()

    useEffect(()=>{
        if(loading){
            console.log("it is loading")
        }
        if(error){
            console.log("an error has occured", error)
        }
        if(data){
            console.log("this is data received ,", data)
            setItems(data.getCartList.cartItems)
            setTotal_Cost(data.getCartList.totalCost)

        }
    },[loading,data,error])


    useEffect(()=>{
      const refetchData=async()=>{
        await refetch()
      }
      refetchData()
    },[navigate])


    // when we increase the quantity it manages the total cost
    const IncreaseTotalCostWithQuantity = (product_price) => {
       setTotal_Cost((preValue)=>preValue + product_price)
    }
    // when we decrease the quantity it manages the total cost
    const DecreaseTotalCostWithQuantity = (product_price) => {
      setTotal_Cost((preValue)=>preValue - product_price)
    }


    return (
        <>
  <div className="flex max-sm:flex-col">
  <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
  <h1 className="text-3xl font-bold flex justify-center gap-5 pb-5 border-b-2 border-black w-1/2 ml-auto mr-auto mt-7">Your cart <span className="text-4xl"><i className="fa-solid fa-cart-shopping"></i></span></h1>
 
  <ul className="flex flex-col divide-y divide-gray-200">
   
   
    {items.map((item)=>(
        <CartItem item={item} RemoveCartItem={RemoveCartItem} DecreaseTotalCost={DecreaseTotalCost} IncreaseTotalCostWithQuantity={IncreaseTotalCostWithQuantity} DecreaseTotalCostWithQuantity={DecreaseTotalCostWithQuantity}/>
    ))}
  </ul>
  <div className="space-y-1 text-right">
    <p>
      Total amount:<span className="font-semibold"> ₹ {total_cost}</span>
    </p>
  </div>
  <div className="flex justify-end space-x-4">
    <button
      type="button"
      onClick={()=>navigate("/")}
      className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-green-700 hover:text-white"
    >
      Back to shop
    </button>
    <button
      type="button"
      onClick={()=>setOrder((preValue)=>{
        if(items.length > 0){
          return !preValue
        }
        return preValue
      })}
      className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-blue-500 hover:text-white"
    >
      Buy Now
    </button>
  </div>
</div>
      {order && <PlaceOrder/>}
  </div>

        </>
    )
}
export default CartList