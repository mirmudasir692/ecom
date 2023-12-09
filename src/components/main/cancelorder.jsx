import AxiosInstance from "../../Axios/AxiosInstance"

function CancelOrderComp({onClick,order_id}){
    const CancelOrder=async()=>{
        const data={
            "order_id":order_id
        }
        const response = await AxiosInstance.delete(`order/?order_id=${order_id}`,)
        console.log(response)
        if(response.status === 200){
            location.reload()
        }
    }
    return (
        <div className="flex flex-col border border-gray-400 w-1/2 ml-auto mr-auto rounded-lg py-2">
        <h1 className="pb-5 text-xl font-thin">Are you sure to cancel the Order</h1>
        <div className="flex justify-center gap-5">
            <button onClick={onClick} className="px-5 py-2 bg-white">No</button>
            <button onClick={CancelOrder} className="px-5 py-2 bg-white">Yes</button>
        </div>
    </div>
    )
}
export default CancelOrderComp