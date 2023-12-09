import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GET_CATEGORIES } from "../../api/category/category"
import { useQuery } from "@apollo/client"

function Categories(){
    const [categories ,setCategories] = useState([])
    const {loading,error,data,refetch} = useQuery(GET_CATEGORIES)
    useEffect(()=>{
        if(loading){
            console.log("it is loading")
        }
        if(error){
            console.log("an error has occurred", error)
        }
        if(data){
            console.log("this is recevied data", data.getCategories)
            setCategories(data.getCategories)
        }

    },[data,loading,error])
    return (
        <>
     <div className="mt-20">
     <h2 className="text-4xl bg-gray-400 py-5 mb-14 w-1/2 ml-auto mr-auto text-white font-extrabold rounded-full max-sm:text-xl border-b-8 border-gray-500">CATEGORIES</h2>
        <div className="flex flex-col gap-20">
  
           {categories && categories.map((category)=>(
             <div key={category.id}>
             <p className="text-start text-3xl pb-1">Stationary</p>
             <Link to={`/products/${category.id}`}>
             <img className="h-96 w-full rounded-lg" src={`http://127.0.0.1:8000/media/${category.image}`} alt="" />
             </Link>
         </div>
           ))}
        </div>
     </div>
        </>
    )
}
export default Categories