import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const Profilemodal = ({ datas }: any) => {
	const navigate = useNavigate();
	
	return (
		<div className='flex justify-center items-center w-screen h-screen bg-[#FFFFFF]'>
			<div className='flex flex-col w-[623px] h-[550px] shadow-md '>
				<div className='flex flex-col'>
					<div className='flex items-center justify-between px-7 font-bold text-2xl mt-6'>
						<p className='mb-0'>Profile Details</p>
						<img
							src='close.svg'
							alt=''
							className='cursor-pointer'
							onClick={() => window.location.reload()}
						/>
					</div>
					<div className='flex w-full flex-col items-center justify-center font-bold text-2xl'>
						<img
							src={datas.photo.map((e: any) => e.profile_img)}
							alt=''
							className='rounded-full w-[90px] h-[90px] mb-2'
						/>
						<p className='mb-2'>{datas.fullName}</p>
						<div
							className='flex gap-6 justify-center items-center cursor-pointer'
							onClick={() => navigate(`/editdriver/${datas?._id}`)}
						>
							<img src='edit.svg' alt='' className='h-5 w-5' />
							<p className='mb-0 font-normal text-lg text-[#5C6881]'>Edit</p>
						</div>
					</div>
				</div>
				<hr className='border-solid h-[2px] my-9 border-[#EEEEEE]' />
				<div className='flex flex-col gap-4 px-7  text-[#012A4A]'>
					<p>
						Route of Operation - {datas.route.pickupStation} - {datas.route.destination}
					</p>
					<p>Phone Number - {datas.phoneNumber} </p>
					<p>Account Number - {datas.accountNumber}</p>
					<p>Upload Valid ID - NIN Slip</p>
				</div>
			</div>
		</div>
	);
};

export default Profilemodal;
