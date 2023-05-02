import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fundWallet } from '../api/auth';

function Fund({handleClose}: any) {
	const [fundData, setFundData] = useState({});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const updateFundData = (e: any) => {
		setFundData({
			...fundData,
			[e.target.name]: e.target.value
		});
		setError('');
	};

	const handleNavigation = (link: string) => {
		window.location.href = link;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const fundResponse: any = await fundWallet(fundData);
		
		handleNavigation(fundResponse.data.data.authorization_url);
		
	};
	

	return (
		<div className=' flex bg-gray-300 items-center justify-center  h-screen w-screen '>
			<div className='gap-10 flex flex-col  items-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] max-[500px]:gap-5'>
				<div className='gap-24 md:px-12 items-center w-full flex'></div>
				<div className=' bg-white gap-10 flex flex-col items-center md:justify-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] max-[500px]:gap-5 h-full'>
					<div className='gap-24 items-center w-full flex flex-row justify-between'>
						<div>
							<p className='text-2xl inset-1 my-2'>Fund wallet</p>
						</div>
						<div>
							<img src='cancel.svg' alt='' onClick={handleClose}/>
						</div>
					</div>

					<div className='gap-2 flex flex-col w-full'>
						<p className='text-sm leading-5 m-0'>Amount</p>
						<div className='flex justify-center items-center rounded-md w-full border-solid font-normal text-[#47494a] [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px]'>
							<input
								className='outline-none bg-inherit border-none inline-flex overflow-clip px-4 py-3 text-left gap-2 w-full'
								onChange={updateFundData}
								type='number'
								placeholder='Enter amount'
								name='amount'
							/>
						</div>
						<br />
						<button
							className='justify-center text-white font-semibold bg-[rgba(247,144,9,1)] px-4 py-3 gap-2 inline-flex items-center rounded-md w-full'
							onClick={handleSubmit}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Fund;
