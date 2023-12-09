import { Link, Outlet } from "react-router-dom"
import Intro from "./intro"

function CustomerService(){
    return (
        <div className="mt-20 flex flex-col justify-center">
                        <h1 className="text-3xl font-light pb-10">Customer Support</h1>

            <Outlet/>
        </div>
    )
}

export default CustomerService