import React, { ReactEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { AllTrips } from '../../api/admin';

import AdminLayout from '../../components/AdminLayout';

const Trips = () => {
	const [trips, setTrip] = useState<Array<any>>([]);

	const fetchTrips = async () => {
		const response: any = await AllTrips();
		const data: any = response?.data?.data;
		setTrip(data);
	};

	useEffect(() => {
		fetchTrips();
	}, []);

	return (
		<>
			<AdminLayout />

			<div className=' bg-[#F2F4F7] h-screen pt-[9rem] pb-4'>
				<div className='h-[37rem]  overflow-x-auto overflow-y-auto rounded-lg ml-[30rem] w-[500px]  max-[720px]:w-[350px] max-[606px]:w-[300px] max-[906px]:ml-[20rem]'>
					<h2 className='font-bold w-full text-4xl  '>Trips</h2>
					
					<table className='w-full text-sm text-left  text-gray-500 font-semibold '>
						<thead className='text-xs text-gray-700 uppercase bg-[#d7dde6]'>
							<tr>
								<th scope='col' className='px-3 py-3 w-[10rem]'>
									Route
								</th>
								<th scope='col' className='px-3 py-3 w-[10rem]'>
									Created At
								</th>
								<th scope='col' className='px-3 py-3 w-[5rem]'>
									Price
								</th>
							</tr>
						</thead>

						<tbody className=''>
							{trips?.map((trip: any) => (
								<tr className='bg-white border-b  hover:bg-gray-50 cursor-pointer' key={trip?.id}>
									<th
										scope='row'
										className='px-10 py-4 font-medium text-gray-900 whitespace-nowrap '
									>
										{trip?.route.pickupStation} - {trip?.route.destination}
									</th>
									<td className='px-10 py-4'> {new Date(trip?.createdAt).toLocaleString()}</td>
									<td className='px-10 py-4 '> {trip?.route.price}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Trips;
