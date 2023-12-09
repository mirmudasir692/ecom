import { useNavigate } from "react-router-dom"
import AxiosInstance from "../../Axios/AxiosInstance"

function DeleteProduct({ product_id,onClose }){
    const navigate = useNavigate()  // intialize navigator 
    console.log(product_id)

    const deleteProduct = async()=>{
       try{
        const Response = await AxiosInstance.delete(`products/product/?id=${product_id}`)
        if(Response.status === 200){
            navigate(-1)
        }

       }catch(error){
        throw error
       }
    }
    return (
        <>
        <div className="z-4 bg-gray-300 p-6">
            <div>
                <h2>
                <span className="text-center text-base font-light">Are you sure to delete this product, set out of stock instead</span>
                </h2>
                <div className="flex justify-center gap-7 mt-7">
                <button className="text-black bg-white px-5 py-2 rounded-md font-bold hover:bg-slate-600 hover:text-white" onClick={onClose}>
                    cancel
                </button>
                <button className="text-black bg-white px-5 py-2 rounded-md font-bold hover:bg-slate-600 hover:text-white" onClick={deleteProduct}>
                    Delete
                </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default DeleteProduct