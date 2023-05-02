import React, { useEffect, useState } from 'react';

import { getAllPassengers, getAllRide, getTotalDrivers } from '../api/admin';
import frame from '../public/frame.png';
import BarChart from '../components/Chart';

import AdminLayout from '../components/AdminLayout';

export default function AdminDashB() {
	const [totalDriverscount, setTotalDriverscount] = useState('');
	const [numberOfPassenger, setNumberOfPassenger] = useState('');
	const [totalSuccessfulRide, setTotalSuccessfulRide] = useState('');

	const data: Array<[string, number]> = [
		['Jan', 15000],
		['Feb', 18000],
		['Mar', 20000],
		['Apr', 15000],
		['May', 22000],
		['Jun', 23000],
		['Jul', 25000],
		['Aug', 25000],
		['Sep', 23000],
		['Oct', 16000],
		['Nov', 10000],
		['Dec', 8000]
	];

	const totalDrivers = async () => {
		const sendResponce: any = await getTotalDrivers();
		
		const driverCount = sendResponce.data.data.totalDrivers;
		if (driverCount) {
			setTotalDriverscount(driverCount);
			
		} else if (!sendResponce.success) {
			setTotalDriverscount('0');
		}
	};

	const totalPassenger = async () => {
		const passengerResponse: any = await getAllPassengers();

		const passengerCount = passengerResponse.data.data.count;
		if (passengerCount) {
			setNumberOfPassenger(passengerCount);
		} else if (!passengerCount.success) {
			setNumberOfPassenger('0');
		}
	};

	const totalRides = async () => {
		const rideResponse = await getAllRide();
		const totalRideCount = rideResponse.data.data.count;
		if (totalRideCount) {
			setTotalSuccessfulRide(totalRideCount);
		} else {
			setTotalSuccessfulRide('0');
		}
	};

	useEffect(() => {
		totalDrivers();
		totalPassenger();
		totalRides();
	}, [totalDriverscount, numberOfPassenger, totalSuccessfulRide]);

	return (
		<>
			<AdminLayout />
			
				<div className='mt-[6rem] pb-10 w-auto ml-[250px] bg-[#F2F4F7]'>
					{/* <h4 className=' ml-12 font-bold text-3xl'>Welcome Admin</h4> */}

					<div className='flex flex-row flex-wrap gap-10 ml-12 pt-10 '>
						<div className='flex flex-col items-start p-7 gap-4 w-80 h-30 bg-white'>
							<div className='flex flex-row items-center space-x-36 w-10'>
								<div className=' '>
									<h3 className='text-3xl font-extrabold'>{totalSuccessfulRide}</h3>
									<p>Rides</p>
								</div>
								<img className='h-10 w-10' src={frame} />
							</div>
						</div>

						<div className='flex flex-col items-start p-7 gap-4 w-80 h-30 bg-white'>
							<div className='flex flex-row items-center space-x-24 w-10'>
								<div className=' '>
									<h3 className='text-3xl font-extrabold'>{numberOfPassenger}</h3>
									<p>Passengers</p>
								</div>
								<img className='h-10 w-10' src={frame} />
							</div>
						</div>

						<div className='flex flex-col items-start p-7 gap-4 w-80 h-30 border-2 bg-white'>
							<div className='flex flex-row items-center space-x-32 w-10'>
								<div className=''>
									<h3 className='text-3xl font-extrabold'>{totalDriverscount}</h3>
									<p>Drivers</p>
								</div>
								<img className='h-10 w-10' src={frame} />
							</div>
						</div>
					</div>

					<div className='mt-10 flex flex-col  px-12 py-8 items-center  bg-white ml-12 w-[65rem] rounded-3xl'>
						<div className='flex flex-col items-start h-[96px] w-[58rem] mt-2'>
							<h3 className=' text-2xl'>Trip Metrics</h3>
							<p className='text-base'>Current summary and activities</p>
						</div>
						<hr className='border-b border-gray-400 w-full' />

						<div className='flex flex-row items-center 2xl:w-96 h-16 py-2 self-stretch md:mt-8 p-r-16'>
							{/* 1 */}
							<div className='border-l-4 border-gray-200 flex flex-row items-center w-16 h-14 flex-grow p-4 m-4'>
								<div className='flex flex-col w-16'>
									<p>Earnings</p>
									<p className='-mt-4'>32%</p>
								</div>
								<p className='ml-4 text-green-700 md:text-base font-semibold mt-6'>6.78%</p>
							</div>
							{/* 2 */}
							<div className='border-l-4 border-gray-200 flex flex-row items-center isolate w-32 h-14 flex-grow order-1 p-4 m-4 b-r-2 '>
								<div className='flex flex-col items-start w-16'>
									<p>Profits</p>
									<p className='-mt-4'>26%</p>
								</div>
								<p className='ml-4 text-green-700 md:text-base font-semibold mt-6'>6.78%</p>
							</div>
							{/* 3 */}
							<div className='border-l-4 border-gray-200 flex flex-row items-center isolate w-32 h-14 flex-grow order-1 p-4 m-4 b-r-2 '>
								<div className='flex flex-col items-start w-16'>
									<p>Previous(month)</p>
									<p className='-mt-4'>6.90%</p>
								</div>
								<p className='ml-4 text-green-700 md:text-base font-semibold mt-6'>6.78%</p>
							</div>
						</div>
						<div className='w-[110%]'>
							<BarChart data={data} title='' />
						</div>
					</div>
				</div>
			
		</>
	);
}
