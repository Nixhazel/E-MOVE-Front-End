import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllRoutes } from '../api/user';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PassengerLayout from '../components/PassengerLayout';

const Passengerdashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [routes, setRoutes] = useState([]);
	const [userRoute, setUserRoute] = useState<any>({});
	const [defaultValue, setDefaultValue] = useState(true);

	const getRoutes = async () => {
		dispatch(showLoading());
		const getRoutesResponce = await getAllRoutes();
		dispatch(hideLoading());
		if (getRoutesResponce.data) {
			setRoutes(getRoutesResponce.data);
		} else if (getRoutesResponce.status == 'error') {
			toast.error(getRoutesResponce.message);
			return;
		}
	};

	const updateDriverData = (e: any) => {
		setUserRoute({
			...userRoute,
			[e.target.name]: e.target.value
		});
		setDefaultValue(false);
	};

	const handleContinue = () => {
		if (!userRoute.route) {
			toast.error('You Must Choose A route');
		} else {
			navigate(`/tripDetails/${userRoute.route}`);
		}
	};

	useEffect(() => {
		getRoutes();
	}, []);

	return (
		<>
			<PassengerLayout/>
			<div className='bg-[rgba(234,236,240,1)] w-screen h-screen'>
				<div className='flex justify-between items-center px-28'>
					<div className='mt-11'>
						<h2 className='text-4xl font-bold'>Choose Route</h2>
						<div className='flex items-center flex-col h-[600px] w-[800px] bg-white px-12 pt-14 gap-10'>
							<div className='flex flex-col w-full gap-8'>
								<div className='flex items-center justify-center gap-20 h-[132px] bg-[rgba(234,236,240,1)] w-full text-2xl'>
									{defaultValue ? (
										<p className='mb-0'>Pickup</p>
									) : (
										<p className='mb-0'>
											{routes
												.filter((e: any) => userRoute.route == e._id)
												.map((route: any) => (
													<span key={route._id}>{route.pickupStation}</span>
												))}
										</p>
									)}
									<img src='arrow2.svg' alt='arrow' />
									{defaultValue ? (
										<p className='mb-0'>Destination</p>
									) : (
										<p className='mb-0'>
											{routes
												.filter((e: any) => userRoute.route == e._id)
												.map((route: any) => (
													<span key={route._id}>{route.destination}</span>
												))}
										</p>
									)}
								</div>
								<div className='flex items-center justify-center h-[52px] w-[207px] bg-[#FFFAEB]'>
									<div className='flex items-center justify-center text-[#B93815]'>
										<p className='mb-0'>See More Routes</p>
										<select
											name='route'
											id='route'
											onChange={updateDriverData}
											className='w-6 outline-none bg-inherit border-none inline-flex overflow-clip'
										>
											<option value=''></option>
											{routes.map((route: any) => (
												<option value={route._id} key={route._id}>
													{route.pickupStation} to {route.destination}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
							<button
								className=' text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3   items-center rounded-md w-full'
								onClick={handleContinue}
							>
								Continue
							</button>
						</div>
					</div>
					<div className='mt-11 h-[689px] relative max-[1050px]:hidden'>
						
						<img src='busplan.svg' alt='bus' className='w-full h-[689px] object-none' />
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

export default Passengerdashboard;
