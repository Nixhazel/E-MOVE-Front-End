import { useNavigate, Link } from 'react-router-dom';

const Emailconfirmpassword = () => {
    const navigate = useNavigate();
    const submit = () => {
		navigate('/login');
	};
	return (
		<div className=' bg-[rgba(242,244,247,1)]  flex justify-center items-center h-screen w-screen'>
			<div className=' bg-white gap-10 flex flex-col  items-center rounded-3xl p-12 w-[479px] max-[768px]:w-[379px] max-[500px]:w-[279px] max-[500px]:gap-5'>
				<img src='mail1.svg' alt='mail SVG' className='max-[500px]:w-[2rem]' />
				<p className='text-2xl font-bold leading-6 m-0 text-[rgba(1,42,74,1)] max-[768px]:text-xl'>
					Check Your Mail
				</p>
				<div className='gap-4 flex flex-col text-center max-[768px]:justify-center max-[768px]:w-[289px] max-[500px]:w-[240px] '>
					<p className='text-sm font-normal leading-5 m-0  text-[rgba(16,24,40,1)]  max-[500px]:text-xs'>
						We sent a password reset link to your email. Please click the link to reset your
						password.
					</p>
					<p className='text-sm leading-5 m-0 max-[500px]:text-xs'>
						Didn't receive an email?{' '}
						<Link to='/forgotpassword' className='cursor-pointer text-[rgba(247,144,9,1)]'>Click to Resend</Link>
					</p>
				</div>
				<button onClick={submit} className='px-4 py-3 gap-2 items-center rounded-md w-[383px] overflow-clip justify-center text-white font-semibold bg-[rgba(247,144,9,1)] max-[768px]:w-[279px] max-[500px]:w-[250px] max-[500px]:text-xs'>
					Back to Login
				</button>
			</div>
		</div>
	);
};

export default Emailconfirmpassword;
