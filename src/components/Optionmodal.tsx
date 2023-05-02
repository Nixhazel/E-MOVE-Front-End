import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertSlice';
import toast from 'react-hot-toast';
import { deletDriver } from '../api/admin';


const Optionmodal = ({id}:any) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	

	const handleSubmit = async (e: any) => {
		dispatch(showLoading());
		const deleteDriverResponce:any = await deletDriver(id);
		
		if (deleteDriverResponce.status == "success") {
			toast.success(deleteDriverResponce.message);
			window.location.reload()
			dispatch(hideLoading());
		} else if (deleteDriverResponce.success == false) {
			toast.error(deleteDriverResponce.message);
		}
	};
	return (
		
			<div className='flex absolute flex-col w-[143px] h-[95px] gap-5 justify-center bg-[#FFFFFF] top-[17rem] right-[7rem]'>
				<div className='flex items-center justify-center gap-9 w-full cursor-pointer' onClick={()=> navigate(`/editdriver/${id}`)}>
					<img src='edit.svg' alt='Edit' />
					<p className='mb-0 w-14'>Edit</p>
				</div>
				<div className='flex items-center justify-center gap-9 w-full cursor-pointer' onClick={handleSubmit}>
					<img src='delete.svg' alt='Delete' />
					<p className='mb-0 w-14'>Delete</p>
				</div>
			</div>
		
	);
};

export default Optionmodal;
