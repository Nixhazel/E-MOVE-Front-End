import axios from "../axios";
import toast from 'react-hot-toast';


export const signUpUser = async (data: any) => {
    try {
      const response = await axios.post(
        "/users/signup",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };


  export const loginUser = async (data: any) => {
    try {
      const response = await axios.post(
        "/users/login",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };


export const requestPasswordReset = async (data: any) => {
	try {
		const response = await axios.post('/users/forgot-password', JSON.stringify(data), {
			headers: { 'Content-Type': 'application/json', accept: '*/*' }
		});
		return response;
	} catch (error) {
		toast.error('Somthing went wrong / Mail not sent');
		return error;
	}
};

export const resetPassword = async (data: any, id: string) => {
    try {
		const response = await axios.put(`/users/reset-password/${id}`, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
        });
		return response;
	} catch (error) {
		toast.error("Somthing went wrong / Password dose not match");
        return error
    }
};

export const fundWallet = async (data: any) => {
 const userDetails: any = localStorage.getItem('userToken');
 const parsedData = JSON.parse(userDetails);
  console.log('token check',parsedData);
  try {
    const response = await axios.post(
      "/users/paystack/pay",
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${parsedData}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const user = async () => {
  try {
    const userDetails: any = localStorage.getItem('userToken');
		const parsedData = JSON.parse(userDetails);
    const config = {
      headers:{
        Authorization:`Bearer ${parsedData}`
      }
    }
      const response = await axios.get(
       "/users/getuser", config
      )
      return response.data;
    
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const transaction = async () => {
  try {
    const userDetails: any = localStorage.getItem('userToken');
		const parsedData = JSON.parse(userDetails);
    const config = {
			headers: {
				Authorization: `Bearer ${parsedData}`
			}
		};
    const response = await axios.get(
      "/users/transaction-history", config
    )
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}