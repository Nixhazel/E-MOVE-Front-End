import React, { useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { editDriver, getAllRoutes, gettingOneDriver } from '../api/admin';
import { Link } from 'react-router-dom';

import AdminLayout from '../components/AdminLayout';

const Editdriver = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [driverData, setDriverData] = useState({});
	const [oneDriver, setOneDriver] = useState<any>({});
	const [error, setError] = useState('');
	const [routes, setRoutes] = useState([]);
	const [photo, setPhoto] = useState(null);
	const [validId, setValidid] = useState(null);
	const pathname = useLocation().pathname;
	const driverId = pathname.split('/')[2];

	const getOneDriver = async () => {
		dispatch(showLoading());
		const oneDriverResponce: any = await gettingOneDriver(driverId);
		dispatch(hideLoading());

		if (oneDriverResponce.data) {
			toast.success(oneDriverResponce.message);
			setOneDriver(oneDriverResponce.data);
		} else if (oneDriverResponce.status == 'error') {
			toast.error(oneDriverResponce.message);
			return;
		}
	};

	const uploadPhoto = async () => {
		const { files }: any = document.querySelector('input[id="photo"]');
		const formData = new FormData();
		formData.append('file', files[0]);
		formData.append('upload_preset', 'dxrfinbk');
		const options = { method: 'POST', body: formData };
		return fetch('https://api.cloudinary.com/v1_1/dadfnrfn4/image/upload', options)
			.then((res) => res.json())
			.then((res: any) => setPhoto(res.url))
			.catch((err) => console.log(err));
	};

	const uploadValidId = async () => {
		const { files }: any = document.querySelector('input[id="validId"]');
		const formData = new FormData();
		formData.append('file', files[0]);
		formData.append('upload_preset', 'dxrfinbk');
		const options = { method: 'POST', body: formData };
		return fetch('https://api.cloudinary.com/v1_1/dadfnrfn4/image/upload', options)
			.then((res) => res.json())
			.then((res: any) => setValidid(res.url))
			.catch((err) => console.log(err));
	};

	const getRoutes = async () => {
		dispatch(showLoading());
		const getRoutesResponce = await getAllRoutes();
		dispatch(hideLoading());

		if (getRoutesResponce.data) {
			toast.success(getRoutesResponce.message);
			setRoutes(getRoutesResponce.data);
		} else if (getRoutesResponce.status == 'error') {
			toast.error(getRoutesResponce.message);
			return;
		}
	};

	const updateDriverData = (e: any) => {
		setDriverData({
			...driverData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		dispatch(showLoading());
		const editDriverResponce: any = await editDriver(driverId, { ...driverData, photo, validId });
		dispatch(hideLoading());
		
		if (editDriverResponce.status == 'success') {
			toast.success(editDriverResponce.message);
			navigate('/admin/alldrivers');
		} else if (editDriverResponce.success == false) {
			toast.error(editDriverResponce.message);
		}
	};

	useEffect(() => {
		getRoutes();
		getOneDriver();
	}, []);
	return (
		<>
			<AdminLayout />

			<div className='flex bg-[#e9ebf0] items-center justify-center gap-16 pt-8 pl-6 pr-10 pb-14 text-sm '>
				<div className='flex flex-col w-[676px] items-center justify-center mt-[7rem] ml-[15rem] max-[760px]:w-[560px] max-[610px]:w-[350px]'>
					<div className='flex items-center justify-between w-full'>
						<h1 className='text-3xl'>Edit a Driver</h1>
						<Link to={'/admin/alldrivers'} className='text-[#F79009] cursor-pointer'>
							View all Drivers
						</Link>
					</div>
					<div className='flex flex-col items-start px-8 py-8 bg-white w-[676px] gap-2 max-[760px]:w-[560px] max-[610px]:w-[350px]'>
						<p className='text-sm leading-5 m-0'>Full Name</p>
						<div className='flex justify-center items-center rounded-md border-solid  mb-3 text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
							<input
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
								onChange={updateDriverData}
								type='text'
								placeholder='Enter your full name'
								defaultValue={oneDriver.fullName}
								name='fullName'
							/>
						</div>

						<p className='text-sm leading-5 m-0'>Route of operation</p>
						<div className='flex items-center justify-between px-2 rounded-md border-solid w-full mb-3  text-[#98A2B3] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
							<p className='px-2 mb-0 '>Select</p>
							<select
								name='route'
								onChange={updateDriverData}
								className='outline-none bg-inherit border-none px-4 py-3 pr-3 text-left gap-2 w-full'
							>
								<option value={oneDriver?.route?._id}>
									{oneDriver?.route?.pickupStation} to {oneDriver?.route?.destination}
								</option>
								{routes.map((route: any) => (
									<option value={route?._id} key={route?._id}>
										{route?.pickupStation} to {route?.destination}
									</option>
								))}
							</select>
						</div>

						<p className='text-sm leading-5 m-0'>Phone Number</p>
						<div className='flex justify-center items-center rounded-md border-solid  mb-3 text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
							<input
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
								onChange={updateDriverData}
								type='number'
								placeholder='Enter your phone number'
								defaultValue={oneDriver.phoneNumber}
								name='phoneNumber'
							/>
						</div>

						<p className='text-sm leading-5 m-0'>Account Number</p>
						<div className='flex justify-center items-center rounded-md border-solid  mb-3 text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
							<input
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
								onChange={updateDriverData}
								type='number'
								placeholder='Type your account number'
								defaultValue={oneDriver.accountNumber}
								name='accountNumber'
							/>
						</div>

						<p className='text-sm leading-5 m-0'>Upload a Valid ID</p>
						<div className='flex justify-center items-center rounded-md border-solid  mb-3 text-[#98A2B3] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
							<input
								type='file'
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left text-[#98A2B3] gap-2 w-full'
								onChange={uploadValidId}
								// value={oneDriver.validId[0].map((e:any) => e.cloudinary_id)}
								id='validId'
							/>
						</div>

						<p className='text-sm leading-5 m-0'>Upload Photo</p>
						<div className='flex justify-center items-center rounded-md border-solid  mb-3 text-[#98A2B3] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
							<input
								type='file'
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left text-[#98A2B3] gap-2 w-full'
								onChange={uploadPhoto}
								id='photo'
							/>
						</div>
						<p className='text-red'>{error ? error : ''}</p>

						<button
							type='submit'
							onClick={handleSubmit}
							className='justify-center text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3 gap-2 inline-flex items-center rounded-md w-full'
						>
							Update Driver
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
		</>
	);
};

export default Editdriver;
