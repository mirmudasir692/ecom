import { useEffect, useState } from "react"
import AxiosInstance from "../../Axios/AxiosInstance"
import Spinner from "../banners/spinner"
import BannerComp from "../banners/success"
import { useQuery } from "@apollo/client"
import {GET_CATEGORIES} from "../../api/category/category"

function AddProduct(){
  const [title,setTitle] = useState("") // title
  const[description,setDescription] = useState("") // description
  const [image,setImage] = useState(null) //image of product
  const [count,setCount] = useState(0)
  const [instock,setInstock] = useState(false)
  const [category_id,setCategory_id] = useState("")
  const [price,setPrice] = useState(0)
  const [uploading,setUploading] = useState(false)
  const [success,setSuccess] = useState(false)
  const [Error,setError] = useState(false)
  const [categories ,setCategories] = useState([])

  const {loading,error,data} = useQuery(GET_CATEGORIES) // fetch the categories

  useEffect(()=>{
    if(data){
      setCategories(data.getCategories)
    }
   

  },[loading,error,data])


  const HandleImageSelection=async(e)=>{
      setImage(e.target.files[0])
  }
  const HandleFormSubmit = async(e)=>{
    e.preventDefault()
    const data = {
      "title":title,
      "description":description,
      "image":image,
      "count":count,
      "in_stock":instock,
      "category_id":category_id,
      "price":price
    }
    try{

      setUploading(true)
      const response = AxiosInstance.post('products/product/',data,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      })
      if((await response).status === 201){
        setSuccess(true)
        setUploading(false)
          // reset the fields 
        setTitle("")
        setDescription("")
        setImage(null)
        setCount(0)
        setPrice(0)
        setInstock(false)
      }
    }catch(error){
      setUploading(false)
      setError(true)
    }
    
  }
  const DisappearSuccessBanner=()=>{
    setSuccess(false)
  }
  const DisappearErrorBanner=()=>{
    setError(false)
  }
    return (
        <>

  {uploading && (<Spinner/>)}
  {success && (<BannerComp bgcolor="bg-green-300" content="Product Added Successfully " onClose={DisappearSuccessBanner}/>)}
  {Error && (<BannerComp bgcolor="bg-red-200" content="Something Unusual Took Place while Adding product" onClose={DisappearErrorBanner}/>)}
<form onSubmit={HandleFormSubmit}>
  <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-3xl leading-7 text-gray-900 mt-5 pb-5 border-b-2 border-solid border-black w-fit ml-auto mr-auto">ADD PRODUCT PAGE</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4 ml-auto">
          <label for="title" className="block text-sm font-medium leading-6 text-gray-900">Title/Name/Related Name</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter the name of a product" required/>
              
            </div>
            <p className="mt-3 text-sm leading-2 text-gray-600">Your Product Name Will Make Your Product More Reachable</p>

          </div>
        </div>

        <div className="col-span-full">
          <label for="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
          <div className="mt-2">
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id="description" placeholder="Enter description here" name="description" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"></textarea>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">Not mandotory, but explaining your product can help the customers to get the right info about product...</p>
        </div>



        <div className="col-span-full">
          <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Product Image</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Upload a Image</span>
                  <input id="file-upload" onChange={HandleImageSelection} name="file-upload" accept=".jpeg, .jpg, .png, .gif" type="file" className="sr-only" required/>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600 pt-2">PNG, JPG, GIF up to 10MB, and it's mandotory</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">More Product Information</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
          <div className="mt-2">
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="0" name="first-name" id="units" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required/>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label for="first-name" className="block text-sm font-medium leading-6 text-gray-900">Total units to be added </label>
          <div className="mt-2">
            <input type="number" value={count} onChange={(e)=>setCount(e.target.value)} placeholder="0" name="first-name" id="units" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>

        <div className="sm:col-span-3 mt-8 ml-auto mr-auto">
<label class="flex items-center relative w-max cursor-pointer select-none">
  <span class="text-md font-light mr-3">Make InStock Or Wait? </span>
  <input type="checkbox" checked={instock} onChange={(e)=>setInstock(e.target.checked)} class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" required/>
  <span class="absolute font-medium text-xs uppercase right-1 text-white"> Wait </span>
  <span class="absolute font-medium text-xs uppercase right-8 text-white"> Yes </span>
  <span class="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
</label>


        </div>

       

        <div className="sm:col-span-3">
          <label for="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
          <div className="mt-2">
            <select value={category_id} onChange={(e)=>setCategory_id(e.target.value)} id="category" name="category" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 px-5">
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
      <p className="mt-1 leading-6 text-green-700 font-light text-xl">All the fields are required, they will greatly enhance the customer reach...</p>

      <div className="mt-10 space-y-10">
       
       
      </div>
    </div>
  </div>

  <div className="mt-6 flex items-center gap-x-6 justify-center">
    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add</button>
  </div>
</form>
        </>
    )
}
export default AddProduct