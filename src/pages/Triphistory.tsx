import React, { useEffect, useState } from 'react';
import { getTripHistory } from '../api/usertriphistory';
import moment from 'moment';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import PassengerLayout from '../components/PassengerLayout';
import { ImFileEmpty } from 'react-icons/im';

function Triphistory() {
	const dispatch = useDispatch();
	const [trip, setTrip] = useState(null);
	const [totaltripcount, setTotaltripcount]: any = useState('');

	const triphistory = async () => {
		dispatch(showLoading());
		const sendResponce: any = await getTripHistory();
		dispatch(hideLoading());
		const tripCount = sendResponce.data;

		if (tripCount) {
			setTotaltripcount(tripCount);
			setTrip(tripCount);
		} else if (sendResponce.success === false) {
			toast.error(sendResponce.message);
		}
	};

	useEffect(() => {
		triphistory();
	}, []);

	return (
		<>
			<PassengerLayout />

			<div className=' bg-[#e9ebf0] flex flex-col items-center h-screen'>
				<div className='flex flex-col items-center justify-center mt-16'>
					<p className='text-left w-full text-3xl font-bold'>Trips History</p>
					{trip ? (
						<div className='relative overflow-x-auto overflow-y-auto sm:rounded-lg w-[730px] max-[971px]:w-[590px] max-[720px]:w-[450px] max-[606px]:w-[370px]'>
							<table className='w-full text-sm text-left text-gray-500 '>
								<thead className='text-xs text-gray-700 uppercase bg-[#d7dde6]'>
									<tr>
										<th scope='col' className='px-3 py-3'>
											Route
										</th>

										<th scope='col' className='px-3 py-3'>
											Fare Amount
										</th>
										<th scope='col' className='px-3 py-3'>
											Date Created
										</th>
									</tr>
								</thead>
								<tbody>
									{totaltripcount?.data?.map((item: any, index: any) => (
										<tr className='bg-white border-b  ' key={item._id}>
											<td className='px-5 py-4'>
												{item.route.pickupStation} - {item.route.destination}
											</td>

											<td className='px-5 py-4'>{item.route.price}</td>
											<td className='px-5 py-4'>
												{moment(new Date(item.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className='gap-6 flex flex-col items-center'>
							<ImFileEmpty color='#98a2b3' size={100} className='pl-3.5' />
							<div className='gap-4 flex flex-col items-center'>
								<p className='text-2xl m-0 leading-[1.4] text-[rgba(16,24,40,1)]'>No Trips</p>
								<p className='text-base m-0 leading-[1.4] text-[rgba(152,162,179,1)]'>
									You have not made any trips yet.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Triphistory;
