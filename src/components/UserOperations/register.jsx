import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios'
import Spinner from "../banners/spinner"

function Register(){
    // Intialize all the state variables here
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [isEmailValid,setIsEmailValid] = useState(true)
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [mobile,setMobile] = useState(undefined)
    const [altmobile,setAltmobile] = useState(0)
    const [gender,setGender] = useState("M")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [PassError,setPassError] = useState("Please choose a password.")

    const navigate = useNavigate() // initailize navigator

    const HandleFormSubmit=async(e)=>{
        e.preventDefault()
        const data={
            "Name":name,
            "email":email,
            "country":country,
            "state":state,
            "city":city,
            "mobile":mobile,
            "alternative_mobile": altmobile,
            "gender":gender,
            "password":password
        }
        try{
            setLoading(true)
            const response = await Axios.post("https://mudasir12345.pythonanywhere.com/accounts/register/",data)
           
            setLoading(false)
            if(response.status === 200){
                navigate("/login")
            }
        }catch(error){
            setLoading(false)
            if(error.response && error.response.data){
               
                if(error.response.data.email){
                   
                    setEmail(error.response.data.email[0])
                    setIsEmailValid(false)
                }
                 if(error.response.data.password){
                   
                    setPassError(error.response.data.password[0])

                }

            }
            else{
              
            }
        }
    }

    return (
        <>
<div className="h-full bg-gray-300 mt-20">
    {loading && <Spinner/>}
	<div className="mx-auto">
		<div className="flex justify-center px-6 py-12">
			<div className="w-full xl:w-3/4 lg:w-11/12 flex">
				<div className="w-full h-auto bg-gray-400 dark:bg-gray-300 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                    ></div>
				<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
					<h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
					<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={HandleFormSubmit}>
                    <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="Name">
                                Name
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="Name"
                                type="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="email">
                                Email
                            </label>
							<input
                                className={
                                    `w-full px-3 py-2 mb-3 text-sm leading-tight border rounded shadow appearance-none focus:outline-none
                                    focus:shadow-outline ${isEmailValid ? "text-gray-700 border-gray-500" : "text-red-600 border-red-700"}
                                `}
                                required
                                id="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="country">
                                Country
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="country"
                                type="text"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                placeholder="Country"
                                required
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="state">
                                State
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="state"
                                type="text"
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                placeholder="State"
                                required
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="city">
                                City
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="city"
                                type="text"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                placeholder="City"
                                required
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="mobile">
                                Mobile
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="mobile"
                                type="tel"
                                value={mobile}
                                onChange={(e)=>setMobile(e.target.value)}
                                placeholder="Mobile"
                                required
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="altmobile">
                                Alternative Mobile
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="altmobile"
                                type="tel"
                                value={altmobile}
                                onChange={(e)=>setAltmobile(e.target.value)}
                                placeholder="Alternative Mobile"
                            />
						</div>
                        <div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="email">
                                Gender
                            </label>
							<select 
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline font-semibold"
                            name="gender" id="gender">
                                <option className="font-semibold" value="M">Male</option>
                                <option className="font-semibold" value="F">Female</option>
                                <option className="font-semibold" value="O">Other</option>
                            </select>
						</div>
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-black" for="password">
                                    Password
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="******************"
                                    required
                                />
								<p className="text-xs italic text-red-500">
                                    {PassError}
                                </p>
							</div>
						<div className="mb-6 text-center">
							<button
                                
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register Account
                            </button>
						</div>
						<hr className="mb-6 border-t" />
						
						<div className="text-center">
							<a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="./index.html">
								Already have an account? <Link to="/login">Login!</Link>
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
        </>
    )
}
export default Register
