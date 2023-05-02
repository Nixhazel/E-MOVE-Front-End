import React, { ReactEventHandler, useEffect } from 'react';
import Modal from './Modal';
import { useState } from 'react';
import { getAllRoute, updateRoute } from '../../api/admin';

import AdminLayout from '../../components/AdminLayout';

const Pricing = () => {
	const [openModal, setOpenModal] = useState(false);
	const [routes, setRoutes] = useState<Array<any>>([]);
	const [updatePrice, setUpdatePrice] = useState<number>();
	const [id, setId] = useState();

	const handleModal = () => {
		setOpenModal((prev) => !prev);
	};

	const handleUpdatePrice = (id: any, price: any) => {
		setUpdatePrice(price);
		setId(id);
		handleModal();
	};

	const fetchRoute = async () => {
		const routeResponse: any = await getAllRoute();
		const data: any = routeResponse?.data?.data;
		setRoutes(data);
		
	};

	useEffect(() => {
		fetchRoute();
	}, []);

	return (
		<>
			<AdminLayout />
			<div className='bg-[#F2F4F7] h-screen pt-[9rem] pb-4'>
				<div className='h-[37rem]  overflow-x-auto overflow-y-auto rounded-lg ml-[30rem] w-[600px]  max-[720px]:w-[350px] max-[606px]:w-[300px] max-[906px]:ml-[20rem]'>
					<h2 className='font-bold text-4xl'>Pricing Overview</h2>

					<table className='w-full text-sm text-left  text-gray-500 font-semibold '>
						<thead className='text-xs text-gray-700 uppercase bg-[#d7dde6]'>
							<tr>
								<th scope='col' className='px-3 py-3 w-[10rem]'>
									Routes
								</th>
								<th scope='col' className='px-3 py-3 w-[10rem]'>
									Pricing
								</th>
								<th scope='col' className='px-3 py-3 w-[10rem]'>

								</th>
							</tr>
						</thead>

						<tbody className=''>
							{routes?.map((route: any) => {
								return (
									<tr
										className='bg-white border-b  hover:bg-gray-50 cursor-pointer'
										key={route?._id}
									>
										<th
											scope='row'
											className='px-10 py-4 font-medium text-gray-900 whitespace-nowrap '
										>
											{route?.pickupStation} - {route?.destination}
										</th>
										<td className='px-10 py-4'> NGN {route?.price} Standard Price</td>
										<td className='px-10 py-4 '>
											{' '}
											<button
												className=' p-1 rounded-sm border border-[#000000]'
												onClick={() => handleUpdatePrice(route?._id, route?.price)}
											>
												Edit
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{openModal && <Modal setOpenModal={setOpenModal} updatePrice={updatePrice} id={id} />}
				</div>
			</div>
		</>
	);
};

export default Pricing;
