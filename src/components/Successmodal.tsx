import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Successmodal = () => {
    const navigate = useNavigate();
	const login = () => {
		toast('Redirecting to Login Page')
		navigate('/login');
	};
	return (
		<div className=' bg-white gap-10 flex flex-col  items-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] max-[500px]:gap-5'>
			<img src='success.svg'alt='success SVG' className='max-[500px]:w-[2rem]' />
			<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)] max-[768px]:text-xl'>
				Successful
			</p>
			<div className='gap-4 flex flex-col text-center max-[768px]:justify-center max-[768px]:w-[289px] max-[500px]:w-[240px] '>
				<p className='text-sm font-normal leading-5 m-0  text-[rgba(16,24,40,1)]  max-[500px]:text-xs'>
					Your password has been changed successfully. Login to access your account
				</p>
			</div>
			<button onClick={login} className='px-4 py-3 gap-2 items-center rounded-md w-[383px] overflow-clip justify-center text-white font-semibold bg-[rgba(247,144,9,1)] max-[768px]:w-[279px] max-[500px]:w-[250px] max-[500px]:text-xs'>
				Continue to Login
			</button>
		</div>
	);
};

export default Successmodal;
