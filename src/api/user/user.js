import AxiosInstance from "../../Axios/AxiosInstance";

const UpdateUser = async (user_id, name, gender, mobile, email, alt_mobile) => {
  try {
    const data = {
      user_id: user_id,
      name: name,
      email: email,
      gender: gender,
      mobile: mobile,
      alt_mobile: alt_mobile,
    };
    const response = await AxiosInstance.patch("accounts/order_user/", data);
    if(response.status === 200){
        return response.status
    }else{
        throw error 
    }
  } catch (error) {
    throw error;
  }
};

export default UpdateUser;
