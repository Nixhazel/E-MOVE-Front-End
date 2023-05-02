import React, { useState } from 'react';
import SuccessModal from '../components/Successmodal';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { resetPassword } from '../api/auth';

const Resetpassword = () => {
	const [send, setSend] = useState({});
	const dispatch = useDispatch();
	const [reset, setReset] = useState(false);

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const userId = params.get('userId');

	const updateSendData = (event: { target: { name: any; value: any } }) => {
		setSend({
			...send,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = async () => {
		dispatch(showLoading());
		const sendResponce: any = await resetPassword(send, userId!);
		dispatch(hideLoading());

		if (sendResponce.data) {
			const { data } = sendResponce;
			if (!data.success) {
				toast.error(data.message);
				return;
			}
			toast.success(data.message);
			setReset(true);
		}
	};

	return (
		<div className=' bg-[rgba(242,244,247,1)] flex justify-center items-center h-screen w-screen'>
			{reset ? (
				<SuccessModal />
			) : (
				<div className=' bg-white gap-10 flex flex-col  items-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] '>
					<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)] max-[768px]:text-xl'>
						Reset Password
					</p>
					<div className=' gap-4 flex flex-col text-center max-[768px]:justify-center max-[768px]:w-[289px] max-[500px]:w-[240px] '>
						<p className=' text-sm leading-5 m-0 w-[110px] font-semibold max-[500px]:text-xs'>
							New Password
						</p>
						<div className='flex justify-center items-center rounded-md border-solid [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] max-[768px]:w-[279px] max-[500px]:w-[240px] max-[500px]:text-xs'>
							<img src='key.svg'alt='' className='px-2 max-[500px]:w-[1.8rem]' />
							<input
								onChange={updateSendData}
								type='password'
								name='password'
								placeholder='Enter your new password'
								className='outline-none bg-inherit px-4 py-3 gap-2 inline-flex border-none  text-left w-[383px] overflow-clip font-normal text-[#5a5f69]  max-[768px]:w-[279px] max-[500px]:w-[240px] max-[500px]:text-xs'
							/>
						</div>

						<p className='text-sm leading-5 m-0 w-[130px] font-semibold max-[500px]:text-xs'>
							Confirm Password
						</p>
						<div className='flex justify-center items-center rounded-md border-solid [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] max-[768px]:w-[279px] max-[500px]:w-[240px] max-[500px]:text-xs'>
							<img src='key.svg' alt='' className='px-2 max-[500px]:w-[1.8rem]' />
							<input
								onChange={updateSendData}
								type='password'
								name='confirmPassword'
								placeholder='Confirm password'
								className='outline-none bg-inherit px-4 py-3 gap-2 inline-flex border-none  text-left w-[383px] overflow-clip font-normal text-[#5a5f69]  max-[768px]:w-[279px] max-[500px]:w-[240px] max-[500px]:text-xs'
							/>
						</div>
					</div>
					<button
						onClick={handleSubmit}
						className='px-4 py-3 gap-2 items-center rounded-md w-[383px] overflow-clip justify-center text-white font-semibold bg-[rgba(247,144,9,1)] max-[768px]:w-[279px] max-[500px]:w-[250px] max-[500px]:text-xs'
					>
						RESET PASSWORD
					</button>
				</div>
			)}
		</div>
	);
};

export default Resetpassword;
