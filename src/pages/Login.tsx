import React, { ReactElement, FC } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertSlice';

const Login: FC<any> = (): ReactElement => {
	const dispatch = useDispatch();

	const [loginData, setLoginData] = useState({});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const updateLoginData = (e: any) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value
		});
		setError('');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		dispatch(showLoading());
		const loginResponse: any = await loginUser(loginData);
		dispatch(hideLoading());
		if (loginResponse.status === 200) {
			// const { loginToken } = loginResponse.data;
			toast.success(loginResponse.data.message);
			localStorage.setItem('userToken', JSON.stringify(loginResponse.data.loginToken));

			if (loginResponse.data.user.isAdmin) {
				navigate('/admin');
			} else {
				navigate('/passengerDashboard');
			}
		} else if (loginResponse.status === 200) {
			toast.error(loginResponse.data.message);
		} else if (loginResponse.response.status === 400) {
			if (loginResponse.response.data.message) {
				toast.error(loginResponse.response.data.message);
			} else {
				toast.error(loginResponse.response.data);
			}
		}
	};

	return (
		<div className='flex justify-center items-center h-screen space-x-10 bg-[rgba(242,244,247,1)] py-9'>
			<div className='flex flex-col w-full md:w-[40rem] text-left h-full'>
				<div className='gap-12 px-8 md:px-12 w-full flex flex-col  text-[rgba(1,42,74,1)]'>
					<div className='flex gap-4 items-center'>
						<img src='Road.svg' alt='' />
						<p className='text-2xl font-extrabold leading-6 m-0 text-[rgba(1,42,74,1)]'>E-Move</p>
					</div>

					<div className='gap-7 flex flex-col items-start'>
						<p className='text-2xl leading-6 m-0 text-[rgba(1,42,74,1)] font-extrabold'>
							Hi, Welcome Back
						</p>
						<br />
						<div className='gap-2 flex flex-col items-start w-full'>
							<p className='text-sm leading-5 m-0'>Email</p>
							<div className='flex justify-center items-center rounded-md border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
								<img src='mail.svg' alt='' className='px-2 ' />
								<input
									className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
									onChange={updateLoginData}
									type='email'
									placeholder='Type your mail'
									name='email'
								/>
							</div>

							<p className='text-sm leading-5 m-0'>Password</p>
							<div className='flex justify-center items-center rounded-md border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-full'>
								<img src='lock.svg' alt='' className='px-2 ' />
								<input
									className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
									onChange={updateLoginData}
									type='password'
									placeholder='Enter password'
									name='password'
								/>
							</div>
							<Link to='/forgotpassword' className='text-blue-400'>
								Forgot Password?
							</Link>
						</div>

						<button
							onClick={handleSubmit}
							className='justify-center text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3 gap-2 inline-flex items-center w-full rounded-md'
						>
							Login
						</button>
					</div>

					<div className='flex justify-center w-full'>
						<p className=''>
							Don't have an account?{' '}
							<a
								onClick={() => navigate('/signup')}
								className='text-[rgba(247,144,9,1)] cursor-pointer'
							>
								Create Account
							</a>
						</p>
					</div>
					<p className='text-red'>{error ? error : ''}</p>
				</div>
			</div>
			<div className='hidden md:block w-50 h-full rounded-3xl max-[1200px]:w-[400px] md:rounded-3xl sm:rounded-2xl'>
				<img
					src='regImage.svg'
					className=' w-full h-full rounded-3xl md:rounded-3xl sm:rounded-2xl'
					alt=''
				/>
			</div>
		</div>
	);
};

export default Login;
