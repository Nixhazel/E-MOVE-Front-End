import React, { useEffect, useState } from 'react';
import { ImFileEmpty } from 'react-icons/im';
import { transaction, user } from '../api/auth';
import Fund from '../components/Fund';
import Transaction from '../components/Transaction';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import PassengerLayout from '../components/PassengerLayout';

function userDashboard() {
	const dispatch = useDispatch();
	const [showFund, setShowFund] = useState(false);
	const [walletBalance, setWalletBalance] = useState({});
	const [name, setName] = useState('');
	const [transact, setTransact] = useState(null);

	const response = async () => {
			dispatch(showLoading());
			const userDetails = await user();
			dispatch(hideLoading());
			setWalletBalance(userDetails.data.walletBalance);
			setName(userDetails.data.fullName.split(' ')[1]);

			const transactionDetails = await transaction();
			setTransact(transactionDetails.data);
		};

	useEffect(() => {
		
		response();
	}, []);

	const handleClose = () => {
		setShowFund(false);
	};

	const handleSubmit = () => {
		setShowFund(true);
	};
	const handleClear = () => {
		setTransact(null);
	};

	return (
		<>
			<PassengerLayout />
			{showFund ? (
				<Fund handleClose={handleClose} />
			) : (
				<div className='relative flex justify-center bg-gray-50  w-[1440px] h-[1000px] '>
					<div className=' gap-5 flex flex-col items-start text-left pt-10'>
						<p className=' font-bold text-left text-[32px] text-[rgba(16,24,40,1)] w-full'>
							Wallet
						</p>

						<div className='flex items-center gap-[700px] justify-center w-full h-[153px] bg-[rgba(234,236,240,1)] rounded-2xl'>
							<div className='gap-3 flex flex-col items-start w-[174px]'>
								<p className=' font-normal m-0 '>Available amount</p>
								<p className='font-bold m-0 text-[26px] '>{`NGN ${walletBalance}`}</p>
							</div>
							<div>
								<button
									onClick={handleSubmit}
									className='gap-2.5 flex justify-center items-center p-2.5 font-normal w-[149px] bg-[rgba(255,250,235,1)] rounded-[100px]'
								>
									<p className='text-base m-0 leading-[1.4]'>Fund wallet</p>
								</button>
							</div>
						</div>

						<div className='flex flex-col items-center justify-center font-normal gap-[70px] w-[1190px]'>
							<div className='flex items-center justify-center gap-[1000px]'>
								<p className=' m-0  text-[rgba(16,24,40,1)]'>Activity</p>
								<button onClick={handleClear} className=''>
									<p className=' m-0  text-[rgba(152,162,179,1)]'>Clear all</p>
								</button>
							</div>
							{transact ? (
								<Transaction />
							) : (
								<div className='gap-6 flex flex-col items-center'>
									<ImFileEmpty color='#98a2b3' size={100} className='pl-3.5' />
									<div className='gap-4 flex flex-col items-center'>
										<p className='text-2xl m-0  text-[rgba(16,24,40,1)]'>No transaction</p>
										<p className=' m-0  text-[rgba(152,162,179,1)]'>
											You have not made any transaction yet.
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default userDashboard;
