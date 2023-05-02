import axios from '../axios';

export const getAllRoutes = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/getAllRoutes', {
			headers: { Authorization: `Bearer ${parsedData}` }
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
export const getUser = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/users/getuser', {
			headers: { Authorization: `Bearer ${parsedData}` }
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};


export const getOneRoute = async (id:any) => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get(`/admin/getSingleRoutes/${id}`, {
			headers: { Authorization: `Bearer ${parsedData}` }
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const bookTrip = async (routeId:any) => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.post(`/users/book-trip/${routeId}`,
			{ },
			{
			headers: { Authorization: `Bearer ${parsedData}` }
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
