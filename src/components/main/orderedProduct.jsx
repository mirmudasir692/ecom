import { useState } from "react"
import CancelOrderComp from "./cancelorder"
import BaseEndUrl from "../../../config/config"


function OrderedProduct({order}){
    const [showDel,setShowDel] = useState(false) // to show delete component
    const disappearDel=()=>{
        setShowDel((prevValue)=>!prevValue)
    }


    return (
        <>
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
  <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
    <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
      <div className="p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
          <div className="mb-4">
            <div className="text-sm font-semibold">Order ID</div>
            <div className="text-sm font-medium text-gray-700">{order.orderId}</div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Date</div>
            <div className="text-sm font-medium text-gray-700">{order.orderedOn}</div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Total Amount</div>
            <div className="text-sm font-medium text-gray-700">₹{order.productPrice}</div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Order Delivered</div>
            <div className="text-sm font-medium text-gray-700">Soon</div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Prepaid</div>
            <div className="text-sm font-medium text-gray-700">{order.prepaid ? <span>Yes</span> : <span>No</span>}</div>
          </div>
          <div className="mb-4">
            <div className="text-sm font-semibold">Status</div>
            <div className="text-sm font-medium text-gray-700">{order.deliver ? <span className="text-green-500 font-extrabold">On The Way</span> : <span className="text-red-500 font-bold">Canceled</span>}</div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1">
      <div className="p-8">
        <ul className="-my-7 divide-y divide-gray-200">
          <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
            <div className="flex flex-1 items-stretch">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                  src={`${BaseEndUrl}media/${order.product.image}`}
                  alt="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png"
                />
              </div>
              <div className="ml-5 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    {order.product.title}
                  </p>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500">x {order.quantity}</p>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end justify-between">
            </div>
          </li>
        </ul>
        <hr className="my-8 border-t border-t-gray-200" />
        <div className="space-x-4">
          <button
            type="button"
            onClick={()=>setShowDel((prev)=>!prev)}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Report
          </button>
        </div>

      </div>
    </div>
  </div>
        {showDel && (
           <CancelOrderComp onClick={disappearDel} order_id={order.id}/>
        )}
</div>

        </>
    )
}
export default OrderedProduct
