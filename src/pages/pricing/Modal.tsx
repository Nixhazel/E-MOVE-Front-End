import React from 'react';
import close from '../../assets/icons/close.png';
import { useState } from 'react';
import { updateRoute, getAllRoute } from '../../api/admin';
import { hideLoading, showLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

interface modalProps {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	updatePrice: number | undefined;
	id: any;
}

const Modal = ({ setOpenModal, updatePrice, id }: modalProps) => {
	const [price, setPrice] = useState(updatePrice);
	const dispatch = useDispatch();

	const handleModal = () => {
		setOpenModal((prev) => !prev);
	};

	const refresh = () => window.location.reload();

	const handelSubmit = async (e: any) => {
		e.preventDefault();

		try {
			dispatch(showLoading());
			await updateRoute(id, price);
			dispatch(hideLoading());
			setOpenModal(false);
			refresh();
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<div
			className='w-[400px] h-[400px] shadow-md p-10 shadow-slate-700 bg-white absolute bsolute top-[250px] left-1/2 transform z-10 -translate-x-1/2 -translate-y-1/2'>
			<div className='flex justify-between items-center'>
				<h3 className='text-xl'>Edit Price</h3>

				<button className='text-xl' onClick={handleModal}>
					<img src={close} alt='close' />
				</button>
			</div>

			<div>
				<form action='' className='flex flex-col' onSubmit={handelSubmit}>
					<label htmlFor='price' className='mt-12'>
						New Price
					</label>
					<input
						value={price ?? ''}
						onChange={(event) => setPrice(Number(event.target.value))}
						type='text'
						name='price'
						className=' indent-3 outline-none w-full border-[1.5px] rounded-sm mt-6 h-[40px] border-slate-800'
						id='price'
						placeholder='NGN) 0.00'
					/>

					<button className='w-full h-[40px] mt-6 rounded-sm bg-[#F79009] text-white'>
						Set new price
					</button>
				</form>

				<div className='text-center'>
					<button className='text-2xl mt-6  text-[#000000]' onClick={handleModal}>Cancel</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
