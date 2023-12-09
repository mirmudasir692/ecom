function OrderConfirmed({order_id}){
    return (
        <div className="border border-black ml-auto mr-auto w-72 py-10 rounded-lg mb-10">
            <span className="text-green-800 text-4xl"><i class="fa-solid fa-circle-check"></i></span>
            <h5 className="font-light text-gray-500">Order Confirmed with reference id </h5>
            <h5>#{order_id}</h5>

        </div>
    )
}
export default OrderConfirmed