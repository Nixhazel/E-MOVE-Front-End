import axios from '../axios';

import toast from 'react-hot-toast';


export const registerDriver = async (data: any) => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);

	try {
		const response = await axios.post('/admin/addDriver', JSON.stringify(data), {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err: any) {
		return err.response;
	}
};



export const getTotalDrivers = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/totalDrivers', {
			headers: {
				Authorization: `Bearer ${parsedData}`,

				'Content-Type': 'application/json'
			}
		});
		return response;


	} catch (err: any) {
		return err.response;
	}
};


export const AllTrips = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/getAllTrips', {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const getAllPassengers = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/totalPassengers', {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const getAllRide = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/totalSucRides', {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err: any) {
		return err.response;
	}
};

export const getAllRoute = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const routes = await axios.get('/admin/getAllRoutes', {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return routes;
	} catch (err) {
		return err;
	}
};


export const updateRoute = async (id: any, price: any) => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const routes = await axios.patch(
			`/admin/edit-route/${id}`,
			{ price },
			{
				headers: {
					Authorization: `Bearer ${parsedData}`,
					'Content-Type': 'application/json'
				}
			}
		);
		return routes;
	} catch (err) {

		return err;
	}
};


export const getAllRoutes = async () => {
	const userDetails: any = localStorage.getItem('userToken');

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/admin/getAllRoutes', {
			headers: {
				Authorization: `Bearer ${parsedData}`
			}
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};


export const editDriver = async (id: any, data: any) => {
	const userDetails: any = localStorage.getItem('userToken');

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.put(`/admin/editDriver/${id}`, JSON.stringify(data), {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const gettingOneDriver = async (id: any) => {
	const userDetails: any = localStorage.getItem('userToken');

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get(`/admin/getOneDriver/${id}`, {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const gettingAllDrivers = async () => {
	const userDetails: any = localStorage.getItem('userToken');

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get(`/admin/getAllDrivers`, {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};




export const deletDriver = async (id:any) => {
	const userDetails: any = localStorage.getItem('userToken');

	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.delete(`/admin/deleteDriver/${id}`, {
			headers: {
				Authorization: `Bearer ${parsedData}`,
				'Content-Type': 'application/json'
			}
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};



