import React, { useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gettingAllDrivers } from '../api/admin';
import Optionmodal from '../components/Optionmodal';
import Profilemodal from '../components/Profilemodal';

import Road from '../public/Road.png';
import Vector from '../public/Vector.png';
import UserPlus from '../public/UserPlus.png';
import MoneyBill from '../public/MoneyBill.png';
import { NavLink } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const Alldrivers = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	const [driverData, setDriverData] = useState<any>([]);
	const [dId, setDId] = useState({});
	const [profileData, setProfileData] = useState({});

	const handleShowModal = (id: any) => {
		setDId(id);
		setShowModal(true);
	};

	const handleShowProfile = (data: any) => {
		setProfileData(data);
		setShowProfile(true);
	};

	const getDrivers = async () => {
		dispatch(showLoading());
		const getDriversResponce = await gettingAllDrivers();
		dispatch(hideLoading());

		if (getDriversResponce.data) {
			toast.success(getDriversResponce.message);
			
			setDriverData(getDriversResponce.data);
		} else if (getDriversResponce.status == 'error') {
			toast.error(getDriversResponce.message);
			return;
		}
	};

	useEffect(() => {
		getDrivers();
	}, []);
	return (
		<>
			<AdminLayout />
			<div>
				{showProfile ? (
					<Profilemodal datas={profileData} />
				) : (
					<div className=' bg-[#e9ebf0] '>
						<div className='h-screen '>
							<div className='relative overflow-x-auto overflow-y-auto rounded-md ml-[20rem] w-[730px] max-[971px]:w-[590px]   max-[720px]:w-[450px] max-[606px]:w-[370px]'>
								<p className='text-left w-full text-3xl font-bold mt-[7rem] '>All Drivers</p>
								<table className='w-full text-sm text-left text-gray-500 '>
									<thead className='text-xs text-gray-700 uppercase bg-[#d7dde6]'>
										<tr>
											<th scope='col' className='px-5 py-3'>
												Full Name
											</th>
											<th scope='col' className='px-5 py-3'>
												Route of Operation
											</th>
											<th scope='col' className='px-5 py-3'>
												Phone Number
											</th>
											<th scope='col' className='px-5 py-3'>
												Account Number
											</th>
											<th scope='col' className='px-5 py-3'>
												Valid ID
											</th>
											<th scope='col' className='px-5 py-3'>
												Photo
											</th>
											<th scope='col' className='px-5 py-3'></th>
										</tr>
									</thead>
									<tbody>
										{driverData.map((driver: any) => (
											<tr
												className='bg-white border-b  hover:bg-gray-50 cursor-pointer'
												key={driver._id}
											>
												<th
													scope='row'
													className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '
													onClick={() => handleShowProfile(driver)}
												>
													{driver.fullName}
												</th>
												<td className='px-5 py-4' onClick={() => handleShowProfile(driver)}>
													{driver.route.pickupStation} to {driver.route.destination}
												</td>
												<td className='px-5 py-4' onClick={() => handleShowProfile(driver)}>
													{driver.phoneNumber}
												</td>
												<td className='px-5 py-4' onClick={() => handleShowProfile(driver)}>
													{driver.accountNumber}
												</td>
												<td className='px-5 py-4' onClick={() => handleShowProfile(driver)}>
													<img
														src={driver.validId.map((e: any) => e.validId_img)}
														alt=''
														className='h-8 w-11 '
													/>
												</td>
												<td className='px-5 py-4' onClick={() => handleShowProfile(driver)}>
													<img
														src={driver.photo.map((e: any) => e.profile_img)}
														alt=''
														className='h-7 w-7 rounded-full'
													/>
												</td>

												<td
													className='flex items-center justify-center pr-3 py-4  cursor-pointer relative '
													onClick={() => handleShowModal(driver._id)}
												>
													<img src='menudots.svg' alt='' className='' />
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{showModal && <Optionmodal id={dId} />}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Alldrivers;
