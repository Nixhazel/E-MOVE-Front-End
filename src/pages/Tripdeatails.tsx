import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getOneRoute, bookTrip } from '../api/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import PassengerLayout from '../components/PassengerLayout';

const Tripdeatails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userRoute, setUserRoute] = useState<any>({});
	const pathname = useLocation().pathname;
	const routeId = pathname.split('/')[2];

	const handlGetOneRoute = async () => {
		dispatch(showLoading());
		const getOneRouteResponce = await getOneRoute(routeId);
		dispatch(hideLoading());
		if (getOneRouteResponce.data) {
			setUserRoute(getOneRouteResponce.data);
		} else if (getOneRouteResponce.status == 'error') {
			toast.error('Error getting route');
			return;
		}
	};

	const handleBookTrip = async () => {
		dispatch(showLoading());
		const bookTripResponce = await bookTrip(routeId);
		dispatch(hideLoading());

		if (bookTripResponce.data) {
			toast.success(bookTripResponce.message);
			navigate('/passengerDashboard');
		} else {
			toast.error(bookTripResponce.response.data.message);
		}
	};

	useEffect(() => {
		handlGetOneRoute();
	}, []);

	return (
		<>
			<PassengerLayout />
			<div className='bg-[rgba(234,236,240,1)] w-screen h-screen'>
				<div className='flex justify-between items-center px-28'>
					<div className='mt-11'>
						<div
							className='flex mb-11 items-center gap-5 cursor-pointer'
							onClick={() => navigate('/passengerDashboard')}
						>
							<img src='Vector.svg' alt='' />
							<h2 className='mb-0'>Go Back</h2>
						</div>
						<div className='flex items-center flex-col h-[600px] w-[800px] bg-white px-12 pt-14 gap-10'>
							<div className='flex flex-col w-full gap-8'>
								<h2 className='text-4xl font-bold mb-0'>Trip Details</h2>
								<img src='map.svg' alt='' className='h-[160px] w-full' />
								<div className='flex items-center justify-center gap-20 h-[100px] bg-[rgba(234,236,240,1)] w-full text-2xl'>
									<div>
										<p className='text-sm'>Destination</p>
										<p className='mb-0 font-bold'>
											{userRoute.pickupStation} - {userRoute.destination}
										</p>
									</div>
									<div>
										<p className='text-sm'>Amount</p>
										<p className='mb-0 font-bold'>N {userRoute.price}</p>
									</div>
									<div>
										<p className='text-sm'>Date</p>
										<p className='mb-0 font-bold'>{moment().format('ddd Do - h:mm a')}</p>
									</div>
								</div>
							</div>
							<button
								className=' text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3   items-center rounded-md w-full'
								onClick={handleBookTrip}
							>
								Book a Trip
							</button>
						</div>
					</div>
					<div className='mt-11 h-[650px] relative max-[1050px]:hidden'>
						<img src='busplan.svg' alt='bus' className='w-full h-[650px] object-none' />
						<div className='flex items-center gap-5 absolute top-[16px] left-[25px]'>
							<img src='Road.svg' alt='' className='h-7 w-7' />
							<p className='mb-0 text-white'>E-Move</p>
						</div>
						<div className='absolute bottom-[20px] left-[25px] text-2xl font-bold text-white'>
							Board our vehicles anywhere in Lagos at regular rates.
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tripdeatails;
