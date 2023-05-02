import React from 'react';
import {useNavigate} from 'react-router-dom'


function Verify() {
	const navigate = useNavigate();

	return (
		
		<div className=' bg-[rgba(242,244,247,1)] flex justify-center items-center h-screen w-screen'>
			<div className=' bg-white gap-10 flex flex-col items-center justify-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] max-[500px]:gap-5'>
				<img src='verifyMail.svg' alt='success SVG' className='max-[500px]:w-[2rem]' />
				<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)] max-[768px]:text-xl'>
					Verify your email
				</p>
				<div className='gap-4 flex flex-col text-center max-[768px]:justify-center max-[768px]:w-[289px] max-[500px]:w-[240px] '>
					<p className='text-sm font-normal leading-5 m-0 text-[rgba(16,24,40,1)] max-[500px]:text-xs'>
						Hi there, click on the verification link sent <br />
						to your email and start enjoying E-move.
					</p>
				</div>
				<button className='justify-center text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3 gap-2 inline-flex items-center rounded-md w-full'
					onClick={() => navigate('/login')}>
					Login
				</button>
			</div>
		</div>
	);
}

export default Verify;
