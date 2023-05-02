import React, { useEffect, useState } from 'react';
import { transaction } from '../api/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/alertSlice';
import { toast } from 'react-hot-toast';
import { getUser } from '../api/user';

function Transaction() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userData, setUserData] = useState<any>({});
	const [transactions, setTransactions] = useState<any>(null);
	const [currentPage, setCurrentPage] = useState(1);

	const goToPrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};
	const goToNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handleGetUser = async () => {
		dispatch(showLoading());
		const getUserResponce = await getUser();
		dispatch(hideLoading());
		if (getUserResponce.data) {
			setUserData(getUserResponce.data);
		} else if (getUserResponce.status == 'error') {
			toast.error('Error getting user');
			return;
		}
	};

	useEffect(() => {
		const response = async () => {
			const transactionDetails = await transaction();
			setTransactions(transactionDetails.data);
		};
		handleGetUser();
		response();
	}, []);

	const transactionsPerPage = 10;
	const totalPages = Math.ceil(transactions?.length / transactionsPerPage);
	const startIndex = (currentPage - 1) * transactionsPerPage;
	const endIndex = startIndex + transactionsPerPage;

	const userTransaction = transactions?.filter((data: any, index: any) => {
		return data.passengerId === userData._id;
	});

	const currentTransactions = userTransaction?.slice(startIndex, endIndex);
	
	return (
		<div>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-[900px] text-sm text-left text-black'>
					<thead className='text-xs text-black uppercase  bg-[#EAECF0]  dark:text-black-400'>
						<tr>
						
							<th scope='col' className='px-6 py-3'>
								Amount(#)
							</th>
							<th scope='col' className='px-6 py-3'>
								Date
							</th>
							<th scope='col' className='px-6 py-3'>
								Status
							</th>
							<th scope='col' className='px-6 py-3'>
								Transaction-Type
							</th>
						</tr>
					</thead>
					<tbody>
						{currentTransactions &&
							currentTransactions.map((trans: any, index: number) => (
								<tr
									key={trans._id}
									className='bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300'
								>
									
									<td className='px-5 py-2'>
										{trans.transactionType === 'Debit' ? trans.amount : trans.amount / 100}
									</td>
									<td className='px-5 py-2'>{new Date(trans.createdAt).toDateString()}</td>
									<td className='px-5 py-2 '>{trans.status}</td>
									<td className='px-5 py-2'>{trans.transactionType}</td>
								</tr>
							))}
					</tbody>
				</table>

				<div className='flex justify-center mt-4'>
					<button
						className='mr-4 disabled:opacity-50'
						disabled={currentPage === 1}
						onClick={goToPrevPage}
					>
						Prev
					</button>
					<button
						className='ml-4 disabled:opacity-50'
						disabled={currentPage === totalPages}
						onClick={goToNextPage}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default Transaction;
