import { Link, Outlet } from "react-router-dom"
import ManageProduct from "./manageproducts"

function Shop(){
    return (
        <>
 <div className="flex flex-row mt-16 max-lg:flex-col gap-10">
 <div className="border border-slate-950 rounded-md mr-auto ml-auto w-3/5">
            <div>
                <div className="flex justify-center bg-slate-900 gap-16 rounded-md">
                    <Link to="" className="p-3 bg-slate-900 text-white hover:bg-slate-700 active:bg-slate-700 focus:ring focus:ring-violet-300">Manage Products</Link> 
                    <Link to="orders" className="p-3 bg-slate-900 text-white hover:bg-slate-700">Orders</Link>
                    <button className="p-3 bg-slate-900 text-white hover:bg-slate-700">Profile</button>
                </div>
            </div>
            {/* this is place where components will be exchanged for a partner
             */}
        <Outlet/>  
        </div>
        <div className="">
            this   will contain some thing another
        </div>
 </div>
        </>
    )
}

export default Shop