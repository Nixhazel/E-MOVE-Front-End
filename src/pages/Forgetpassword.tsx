import React, { ReactElement, FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../api/auth';
import { hideLoading, showLoading } from '../redux/alertSlice';

const Forgetpassword: FC<any> = (): ReactElement => {
	const [send, setSend] = useState({});
    const dispatch = useDispatch();
	const navigate = useNavigate();

	const updateSendData = (event: { target: { name: any; value: any } }) => {
		setSend({
			...send,
			[event.target.name]: event.target.value
		});
	};

    const handleSubmit = async () => {
        dispatch(showLoading());
        const sendResponce: any = await requestPasswordReset(send);
        dispatch(hideLoading());

        if (sendResponce.data) {
			const { data } = sendResponce;
			if (!data.success) {
                toast.error(data.message);
                navigate('/forgotpassword');
                return;
            } 
            toast.success(data.message);
			navigate('/emailconfirmpassword');
		}
	};

	return (
		<div className=' bg-[rgba(242,244,247,1)] flex justify-center items-center h-screen w-screen'>
			<div className=' bg-white gap-10 flex flex-col  items-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] '>
				<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)] max-[768px]:text-xl'>
					Forgot Password
				</p>

				<div className='gap-4 flex flex-col text-center max-[768px]:justify-center max-[768px]:w-[289px] max-[500px]:w-[240px] '>
					<p className='text-sm font-normal leading-5 m-0  text-[rgba(16,24,40,1)] max-[500px]:text-xs'>
						Enter the email associated with your account and we’ll send an email with instructions
						to reset your password
					</p>
					<div className='gap-2 flex flex-col items-center text-[rgba(1,42,74,1)]'>
						<p className='relaive text-sm leading-5 m-0'>Email</p>
						<div className='flex justify-center items-center rounded-md border-solid [box-shadow:0px_0px_0px_1px_rgba(152,_162,_179,_1)_inset] [box-shadow-width:1px] w-[383px] max-[768px]:w-[279px] max-[500px]:w-[240px] max-[500px]:text-xs'>
							<img src='mail.svg' alt='' className='px-2 max-[500px]:w-[1.8rem]' />
							<input
								onChange={updateSendData}
								type='email'
								name='email'
								id=''
								placeholder='Enter Your Email'
								className='outline-none bg-inherit px-4 py-3 gap-2 inline-flex items-center rounded-md text-left w-[380px] overflow-clip font-normal text-[#5a5f69]  '
							/>
						</div>
					</div>
				</div>
				<button
					onClick={handleSubmit}
					type='submit'
					className='px-4 py-3 gap-2 items-center rounded-md w-[383px] overflow-clip justify-center text-white font-semibold bg-[rgba(247,144,9,1)] max-[768px]:w-[279px] max-[500px]:w-[250px] max-[500px]:text-xs'
				>
					RESET PASSWORD
				</button>

				<Link
					to='/login'
					className='cursor-pointer text-sm font-semibold leading-5 m-0 text-[rgba(247,144,9,1)]'
				>
					Back to Login
				</Link>
			</div>
		</div>
	);
};

export default Forgetpassword;
