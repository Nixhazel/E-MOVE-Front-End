import axios from '../axios';


export const getTripHistory = async () => {
	const userDetails: any = localStorage.getItem('userToken');
	const parsedData = JSON.parse(userDetails);
	try {
		const response = await axios.get('/users/getAllPassengerTrips', {
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
