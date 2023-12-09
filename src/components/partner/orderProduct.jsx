function OrderProduct({order}){
    console.log(order)


    return (
       <div className="flex bg-slate-200 border border-gray-500 rounded-lg py-5 px-2">
         <div className="flex flex-col w-full gap-5">
           <div className="flex justify-between">
           <img className="w-24 h-24 rounded-full" src={`http://127.0.0.1:8000/media/${order.product.image}`} alt="" />
            <p className="text-2xl font-light pb-5 text-gray-500">{order.product.title}</p>
           </div>
          <div className="flex justify-evenly">
          <p className="font-semibold text-gray-500">{order.shippingCountry}, {order.shippingState}, {order.shippingCity}, {order.zipcode}</p>
            <p className="font-semibold text-black">{order.phoneNum}</p>
            <p>{order.delivered ? <span className="text-green-600 font-semibold">Delivered</span> : <span className="text-yellow-800 font-semibold">On Way</span>}</p>
            <p className="text-gray-600 font-light">{order.orderedOn}</p>
          </div>
        </div>
       </div>
    )
}

export default OrderProduct