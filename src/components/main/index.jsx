import { useEffect, useState } from "react"
import CategoryProducts from "./productslist"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../../api/category/category"

function Index(){
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
        <div className="mt-10 flex flex-col gap-10">
           {categories && categories.map((category)=>(
             <div key={category.id}>
             <CategoryProducts category={category} />
         </div>
           ))}
            
         
        </div>
        </>
    )
}
export default Index