// this is component for cart item 

import { useState } from "react"
import { DeleteCartItem, UpdateCartItem } from "../../api/cartlist/cartlist"
import BaseEndUrl from "../../../config/config"



function CartItem({ item, RemoveCartItem, DecreaseTotalCost, IncreaseTotalCostWithQuantity, DecreaseTotalCostWithQuantity }){
    console.log(item)

    const [quantity,setQuantity] = useState(item.quantity)
    const [modified ,setModified] = useState(false) // if user change the quantity show him save buttom



    const IncreaseQuantity = () => {
      setQuantity((preValue)=>preValue + 1)
      console.log(quantity)
      IncreaseTotalCostWithQuantity(item.product.price)
      setModified(true)
      
    }

    const DecreaseQuantity = () => {
      if(quantity > 1){
        setQuantity((preValue)=>preValue - 1)
        console.log(quantity)
        DecreaseTotalCostWithQuantity(item.product.price)
        setModified(true)
      }
    }

    const HandleCartUpdation = async(cartitem_id, quantity)=>{
      const response = await UpdateCartItem(cartitem_id, quantity)
        setModified(false)  // when cart is updated set the modified to false
    }

    const HandleCartDeletion = async(cartitem_id)=>{
      console.log("this is cart id, ", cartitem_id)
      const result = await DeleteCartItem(cartitem_id)
      console.log("this is result ", result)
      await DecreaseTotalCost(item.product.price)
      await RemoveCartItem(cartitem_id)
    }

    return (
        <>
        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <img
          className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
          src={`${BaseEndUrl}media/${item.product.image}`}
          alt="Nike Air Max 90"
        />
        <div className="flex w-full flex-col justify-between pb-4">
          <div className="flex w-full justify-between space-x-2 pb-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                {item.product.title}
              </h3>
              <p className="text-sm">{item.product.category}</p>
            </div>
            <div className="text-right flex flex-col gap-5">
              <p className="text-lg font-semibold">₹ {item.product.price} </p>
              <div>
              <p className="flex justify-center font-black pb-2">Quantity </p>
              <div className="flex justify-center gap-2">
                <button onClick={DecreaseQuantity} className="border-2 border-gray-500 px-2 py-0 rounded-lg font-bold"><i className="fa-solid fa-minus"></i></button>
                <span className="text-2xl font-medium">{quantity}</span>
                <button onClick={IncreaseQuantity} className="border-2 border-gray-500 px-2 py-0 rounded-lg font-bold"><i className="fa-solid fa-plus"></i></button>
              </div>
              <button onClick={()=>HandleCartUpdation(item.id,quantity)} className={`flex ml-auto mr-auto bg-blue-500 text-white px-2 mt-2 rounded-lg ${modified ? "block" : "hidden"}`}>Save</button>
              </div>
            </div>
          </div>
          <div className="flex divide-x text-sm">
            <button
              type="button"
              className="flex items-center space-x-2 px-2 py-1 pl-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-trash"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              <button onClick={()=>HandleCartDeletion(item.id)}><span>Remove</span></button>
            </button>
          </div>
        </div>
      </div>
    </li>
        </>
    )
}
export default CartItem
