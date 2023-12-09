import Header from "./headers";
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";

function Body(){
    return (
        <>
        <Header/>
        <SideBar/>
        <Outlet/>
        </>
    )
}
export default Body