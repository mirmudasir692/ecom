import { useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import { GET_PRODUCT } from "../../graphql/query"
import { useEffect, useState } from "react"
import BannerComp from "../banners/success"
import Spinner from "../banners/spinner"
import AxiosInstance from "../../Axios/AxiosInstance"
import DeleteProduct from "./deletecomp"
import { GET_CATEGORIES } from "../../api/category/category"


function EditProduct(){

    const navigate = useNavigate() // initialize navigator


    const [title,setTitle] = useState("") // title
    const[description,setDescription] = useState("") // description
    const [image,setImage] = useState(null) //image of product
    const [count,setCount] = useState(0)
    const [instock,setInstock] = useState(false)
    const [category_id,setCategory_id] = useState("")
    const [uploading,setUploading] = useState(false)
    const [price ,setPrice] = useState("")
    const [success,setSuccess] = useState(false)
    const [Error,SetError] = useState(false)
    const [VisibleDel,setVisibleDel] = useState(false)  // for displaying the    delete bar for partner
    const product_id = useParams()
    const [product,setProduct] = useState(null)
    const productId = String(product_id.product_id)
    const [categories,setCategories] = useState([])
    const {loading,error,data,refetch} = useQuery(GET_PRODUCT,{
        variables: { productId },
    })


  

  

    useEffect(() => {
        if (!loading && data && data.partnerProduct !== null) {
          const { title, description, image, count, inStock, category,price } =
            data.partnerProduct;
      
          setProduct(data.partnerProduct);
          setTitle(title);
          setDescription(description);
          setImage(image);
          setCount(count);
          setInstock(inStock);
          setCategory_id(category.id);
          setPrice(price)

        }
      }, [loading, data,navigate]);


      const {loading: loading1, data: data1, error: error1} = useQuery(GET_CATEGORIES)

      useEffect(()=>{

        if(loading1){
          console.log("it is loading")
        }
  
        if(data1){
          console.log("this is the data ",data1.getCategories)
          setCategories(data1.getCategories)
        }
        
        if(error1){
          console.log("an error raised ", error1)
        }
      },[data1,loading1,error1])

      useEffect(()=>{
        const RefetchData = async()=>{
            await refetch()
        }
        RefetchData()
      },[navigate])

      const HandleProductDeletion=async(id)=>{    // it will handle deletion of a product by their owner.....
        const response = await AxiosInstance.delete(`partner/products/${id}`)

      }


      const goBack=()=>{   // function for go back when owner cancels
        navigate(-1)
      }


  
    const HandleFormSubmit = async(e)=>{
        e.preventDefault()
        const data = {
          "id":product_id,
          "title":title,
          "description":description,
          "count":count,
          "in_stock":instock,
          "category_id":category_id,
          "price":price
        }
        try{
    
          setUploading(true)
          const response = await AxiosInstance.patch('products/product/',data,{
          })
          if(response.status === 200){
            
            setSuccess(true)
            setUploading(false)
              // reset the fields 
            setTitle("")
            setDescription("")
            setImage(null)
            setCount(0)
            setInstock(false)
            navigate("/partner/shop/")
          }
          else{
            setUploading(false)
          }
        }catch(error){
          setUploading(false)
          SetError(true)
        }
        
      }
      const DisappearSuccessBanner=()=>{
        setSuccess(false)
      }
      const DisappearErrorBanner=()=>{
        SetError(false)
      }


      const DisableDeleteBar = ()=>{
        setVisibleDel(false)
      }



    return (
        <>
    <>

{VisibleDel && <DeleteProduct product_id={product && product.id} onClose={DisableDeleteBar}/>}
{uploading && (<Spinner/>)}
{success && (<BannerComp bgcolor="bg-green-300" content="Product updated successfully" onClose={DisappearSuccessBanner}/>)}
{Error && (<BannerComp bgcolor="bg-red-200" content="Something Unusual Took Place while Adding product" onClose={DisappearErrorBanner}/>)}
<form onSubmit={HandleFormSubmit}>
<div className="space-y-12">
  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-3xl leading-7 text-gray-900 mt-5 pb-5 border-b-2 border-solid border-black w-fit ml-auto mr-auto"><span className="font-extrabold text-gray-500">Edit  :</span> {product && product.title}</h2>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-4 ml-auto">
        <label for="title" className="block text-sm font-medium leading-6 text-gray-900">Title/Name/Related Name</label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
            <input value={title ? title : ""} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter the name of a product" required/>
            
          </div>

        </div>
      </div>

      <div className="col-span-full">
        <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
        <div className="mt-2">
          <textarea value={description ? description : ""} onChange={(e)=>setDescription(e.target.value)} id="description" placeholder="Enter description here" name="description" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5" required></textarea>
        </div>
      </div>



    
    </div>
  </div>

  <div className="border-b border-gray-900/10 pb-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">More Product Information</h2>

    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Total units to be added </label>
        <div className="mt-2">
          <input type="number" value={count ? count : 0} onChange={(e)=>setCount(e.target.value)} placeholder="0" name="first-name" id="units" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
        </div>
      </div>
      <div className="sm:col-span-3">
        <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Price </label>
        <div className="mt-2">
          <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="0" name="first-name" id="units" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
        </div>
      </div>

      <div className="sm:col-span-3 mt-8 ml-auto mr-auto">
<label class="flex items-center relative w-max cursor-pointer select-none">
<span class="text-md font-light mr-3">Make InStock Or Wait? </span>
<input type="checkbox" checked={instock ? instock :false} onChange={(e)=>setInstock(e.target.checked)} class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
<span class="absolute font-medium text-xs uppercase right-1 text-white"> Wait </span>
<span class="absolute font-medium text-xs uppercase right-8 text-white"> Yes </span>
<span class="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
</label>


      </div>

     

      <div className="sm:col-span-3">
        <label for="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
        <div className="mt-2">
          <select value={category_id ? category_id : ""} onChange={(e)=>setCategory_id(e.target.value)} id="category" name="category" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-5">
            <option value="">None</option>
            {
              categories.map((category)=>(
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }

          </select>
        </div>
      </div>

       
    </div>
  </div>

  <div className="border-b border-gray-900/10 pb-12">

    <div className="mt-10 space-y-10">
     
     
    </div>
  </div>
</div>

<div className="mt-6 flex items-center gap-x-6 justify-center">
  <button type="button" onClick={goBack} className="text-sm font-semibold leading-6 text-gray-900 hover:bg-slate-500 px-4 py-2 rounded-md hover:text-white">Cancel</button>
  <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
  <button type="button" onClick={()=>setVisibleDel(true)} className="rounded-md bg-red-700 px-5 py-2 font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 text-md"><i class="fa-solid fa-trash"></i></button>
</div>
</form>
      </>        </>
    )
}
export default EditProduct