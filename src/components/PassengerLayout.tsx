import React, { useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../api/user';

const PassengerLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<any>({});

	const handleGetUser = async () => {
		dispatch(showLoading());
		const getUserResponce = await getUser();
		dispatch(hideLoading());
		if (getUserResponce.data) {
			setUserData(getUserResponce.data);
		} else if (getUserResponce.status == 'error') {
			toast.error('Error getting user');
			return;
		}
	};

	const logout = (e: any) => {
		if (e.target.value === 'logout') {
			localStorage.removeItem('userToken');
			navigate('/login');
		} else {
			toast.error('Account feature not working yet');
		}
	};

	useEffect(() => {
		handleGetUser();
	}, []);
	return (
		<div className='flex w-screen h-16 justify-between items-center px-32 bg-[#FFFFFF]'>
			<div className='flex items-center gap-5'>
				<img src='Road.svg' alt='' />
				<h1 className='mb-0'>E-Move</h1>
			</div>
			<div className='flex items-center justify-between w-80'>
				<NavLink
					to={'/passengerDashboard'}
					className={({ isActive }) =>
						isActive ? 'mb-0 text-[rgba(247,144,9,1)]' : 'mb-0 hover:text-[rgba(247,144,9,1)]'
					}
				>
					Book a route
				</NavLink>
				<NavLink
					to={'/userDashboard'}
					className={({ isActive }) =>
						isActive ? 'mb-0 text-[rgba(247,144,9,1)]' : 'mb-0 hover:text-[rgba(247,144,9,1)]'
					}
				>
					Wallet
				</NavLink>
				<NavLink
					to={'/triphistory'}
					className={({ isActive }) =>
						isActive ? 'mb-0 text-[rgba(247,144,9,1)]' : 'mb-0 hover:text-[rgba(247,144,9,1)]'
					}
				>
					Trips
				</NavLink>
			</div>
			<div className='flex items-center  justify-center w-42'>
				<p className='mb-0'>Hi {userData.fullName}</p>
				<select
					name='profile'
					id=''
					onChange={logout}
					className='w-9 outline-none bg-inherit border-none inline-flex overflow-clip'
				>
					<option value=''></option>
					{/* <option value='account'>account</option> */}
					<option value='logout'>logout</option>
				</select>
			</div>
		</div>
	);
};

export default PassengerLayout;
