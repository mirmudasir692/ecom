import { Dispatch } from "react"
import { logout } from "./AuthSlice"

const LogoutUser = (dispatch, Dispatch) =>{
    dispatch(logout())

}
export default LogoutUser