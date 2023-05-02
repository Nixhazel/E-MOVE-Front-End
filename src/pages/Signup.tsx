import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../api/auth';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Verify from '../components/Verify';
import { hideLoading, showLoading } from '../redux/alertSlice';

export default function Signup() {
	const dispatch = useDispatch();
	const [signUpData, setSignUpData] = useState({});
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const [verify, setVerify] = useState(false);

	const updateSignUpData = (e: any) => {
		setSignUpData({
			...signUpData,
			[e.target.name]: e.target.value
		});
		setError('');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		dispatch(showLoading());
		const signUpResponse: any = await signUpUser(signUpData);
		dispatch(hideLoading());
		if (signUpResponse.status === 201) {
			toast.success(signUpResponse.data.message);
			setVerify(true);
		} else if (signUpResponse.status === 200) {
			toast.error(signUpResponse.data.message);
		} else if (signUpResponse.response.status === 400) {
			toast.error(signUpResponse.response.data.message);
		}
	};

	return (
		<>
			{verify ? (
				<Verify />
			) : (
				<div className='flex justify-center items-center space-x-10 bg-[rgba(242,244,247,1)] py-9'>
					<div className='flex flex-col w-full md:w-[40rem] text-left items-center h-full'>
						<div className='gap-12 px-8 md:px-12 w-full flex flex-col text-[rgba(1,42,74,1)]'>
							<div className='flex gap-4 items-center'>
								<img src='Road.svg' alt='' />
								<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)]'>E-Move</p>
							</div>

							<div className='gap-7 flex flex-col items-start'>
								<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)]'>
									Create your account
								</p>
								<br />
								<div className='gap-2 flex flex-col items-start w-full'>
									<p className='text-sm leading-5 m-0'>Full Name</p>
									<div className='flex justify-center items-center rounded-md w-full border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
										<img src='avatar.svg' alt='' className='px-2 ' />
										<input
											className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
											onChange={updateSignUpData}
											type='text'
											placeholder='Type your full name'
											name='fullName'
										/>
									</div>

									<p className='text-sm leading-5 m-0'>Email</p>
									<div className='flex items-center w-full rounded-md border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
										<img src='envelop.svg' alt='' className='px-2 ' />
										<input
											className='outline-none bg-transparent border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
											onChange={updateSignUpData}
											type='email'
											placeholder='Type your mail'
											name='email'
										/>
									</div>

									<p className='text-sm leading-5 m-0'>Phone</p>
									<div className='flex items-center w-full rounded-md border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
										<img src='phone.svg' alt='' className='px-2 ' />
										<input
											className='outline-none bg-transparent border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
											onChange={updateSignUpData}
											type='number'
											placeholder='Enter phone number'
											name='phone'
										/>
									</div>

									<p className='text-sm leading-5 m-0'>Gender</p>
									<div className='flex items-center justify-between px-2 rounded-md border-solid w-full font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
										<BsGenderAmbiguous color='#98a2b3' size={25} />
										<select
											name='gender'
											onChange={updateSignUpData}
											className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2'
										>
											<option value=''></option>
											<option value='male'>Male</option>
											<option value='female'>Female</option>
										</select>
									</div>

									<p className='text-sm leading-5 m-0'>Date of Birth</p>
									<div className='flex space-x-80 items-center w-full rounded-md border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] max-[4px]:space-x-36 max-[768px]:space-x-96 max-[651px]:space-x-60'>
										<SlCalender color='#98a2b3' size={30} className='pl-3.5' />
										<input
											className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 '
											onChange={updateSignUpData}
											type='date'
											placeholder=''
											name='dateOfBirth'
										/>
									</div>

									<p className='text-sm leading-5 m-0'>Password</p>
									<div className='flex items-center rounded-md border-solid font-normal text-[#47494a] w-full [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
										<img src='lock.svg' alt='' className='px-2 ' />
										<input
											className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
											onChange={updateSignUpData}
											type='password'
											placeholder='Enter password'
											name='password'
										/>
									</div>
								</div>

								<button
									type='submit'
									onClick={handleSubmit}
									className='justify-center text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3 gap-2 inline-flex items-center rounded-md w-full'
								>
									Sign Up
								</button>
							</div>

							<div className='flex justify-center w-full'>
								<p className=''>
									Already have an account?{' '}
									<a
										onClick={() => navigate('/login')}
										className='text-[rgba(247,144,9,1)] cursor-pointer'
									>
										Login
									</a>
								</p>
							</div>
							<p className='text-red'>{error ? error : ''}</p>
						</div>
					</div>
					<div className='hidden md:block w-50 h-full rounded-3xl max-[1200px]:w-[400px] md:rounded-3xl sm:rounded-2xl'>
						<img
							src='regImage.svg'
							className=' w-full  h-screen rounded-3xl md:rounded-3xl sm:rounded-2xl'
							alt=''
						/>
					</div>
				</div>
			)}
		</>
	);
}
