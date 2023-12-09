import { useState } from "react"
import AxiosInstance from "../../Axios/AxiosInstance"
import Spinner from "../banners/spinner"
import BannerComp from "../banners/success"

function Register(){
    /*
    these are the state varaibles and these will handle form data change
    
    */
   const [name,setName] = useState("")
   const [email,setEmail] = useState("")
   const [mobile,setMobile] = useState("")
   const [category,setCategory] = useState('General')
   const [logo,setLogo] = useState(null)
   const [loading,setLoading] = useState(false)
   const [success,setSuccess] = useState(false)
   const [error,setError] = useState(false)

   // select the Image file
   const SelectCompLogo =(e)=>{
    setLogo(e.target.files[0])
   }


   const DisAbleBanner=()=>{
    setSuccess(false)
   }
   const DisAbleErrorBanner=()=>{
    setError(false)
   }


   /*  this is the call to the api, to register Partner , it will send credentials to the server for registration...... it will use axios instance  */

   const data={
    "company_name":name,
    "email":email,
    "mobile":mobile,
    "category":category,
    'company_logo':logo
   }

   const RegisterPartner=async()=>{
    setLoading(true)
    try{
      const response = await AxiosInstance.post('partner/register/',data,{
        headers:{
          "Content-Type":'multipart/form-data'
        }
      })
      if(response.status === 201){
        // reset all the fields after the registering
        setName("")
        setEmail("")
        setMobile("")
        setCategory('General')
        setLogo(null)
      }
      setLoading(false)
    }catch(error){

      // set loading to false and show error 
      setLoading(false)
      setError(true)
    }
  }
    return (
        <>
        {loading && <Spinner/>}
        {success && <BannerComp content="Registered Successfully" BorderColor="border-green-600" bgcolor="bg-green-100" onClose={DisAbleBanner}/>}
        {error && <BannerComp content="Something went wrong... Please try later" BorderColor="border-red-600" bgcolor="bg-red-200" onClose={DisAbleErrorBanner}/>}
<div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
  <div className="container max-w-screen-lg mx-auto ">
    <div>
      <h2 className="font-semibold text-gray-600 pb-10 border-b text-3xl ">Register Your Company</h2>
     

      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-2xl pb-5">Company Details</p>
            <p className="leading-8 text-base">All the fields are mandatory, these will be shown to the Customers</p>
            <p className="leading-8 text-base text-red-600 font-extrabold">So these will affect the customer reach</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label for="company_name">Company Name</label>
                <input type="text" placeholder="name" name="company_name" id="company_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={name} onChange={(e)=>setName(e.target.value)} required />
              </div>

              <div className="md:col-span-5">
                <label for="email">Commercial Email</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email@domain.com" required />
              </div>
              <div className="md:col-span-5">
                <label for="mobile">Commercial Mobile</label>
                <input type="tel" name="mobile" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="*****" required />
              </div>
              <div className="md:col-span-5">
                <label for="company_name">Choose Catagory</label>
                <select type="text" placeholder="name" name="company_name" id="company_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="General" >General</option>
                <option value="Cosmetic">Cosmetic</option>
                <option value="Clothing">Clothing</option>
                <option value="Stationary">Stationary</option>
                <option value="Grocery">Grocery</option>
                </select>
              </div>
            
<div className="border border-dashed border-gray-500 relative mr-auto ml-auto w-52">
    <input type="file" className="cursor-pointer relative block opacity-0 w-96 h-full p-20 " onChange={SelectCompLogo} accept="image/png, image/jpeg,
    image/gif" required/>
    <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
        <h4>
            Drop files anywhere to upload
            <br/>or
        </h4>
        <p className="">Select Files</p>
    </div>
</div>
          

            
      
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button onClick={RegisterPartner} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
      
  </div>
</div>
        </>
    )
}

export default Register