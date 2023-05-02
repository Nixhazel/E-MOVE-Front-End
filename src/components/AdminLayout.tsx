import React from 'react';
import Road from '../public/Road.png';
import Vector from '../public/Vector.png';
import UserPlus from '../public/UserPlus.png';
import MoneyBill from '../public/MoneyBill.png';

import { NavLink, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const logout = (e: any) => {
			localStorage.removeItem('userToken');
			navigate('/login');
    };
    
	return (
		<div>
			{/* Top Nav */}
			<nav className='fixed top-0 text-5xl bg-white w-full h-24 z-10 flex justify-end items-center text-[#607A8E]'>
				<div className='text-lg flex justify-around w-[200px] font-semibold mr-5'>
					<h2 className=' border-r-2 border-b-slate-400 font-bold pe-4'> Hi, Admin</h2>
					<h2 className=' cursor-pointer font-bold pe-4' onClick={logout}>Logout</h2>
				</div>
			</nav>

			{/* Side Bar */}
			<div className='fixed top-0 h-full left-0  bg-white w-[250px] z-40 '>
				<div className='flex items-center justify-center'>
					<img src={Road} alt='' className='h-8 w-8 mr-1' />
					<h1 className=' text-[#607A8E] text-3xl pt-4'>E-Move</h1>
				</div>

				<div className='pt-24'>
					<div className='text-[#607A8E] ms-6'>Main</div>
					<ul className='ms-8 mt-10'>
						<li className='mb-8'>
							<NavLink
								to={`/admin`}
								className={({ isActive }) =>
									isActive
										? 'bg-[#EC8F22] text-white  font-semibold  rounded-md p-4 inline-flex items-center relative   w-[200px] h-[40px]'
										: 'font-semibold text-[#607A8E] inline-flex items-center p-4 justify-center relative  w-[200px] h-[40px]'
								}
								end
							>
								<span className='inline-block w-[20%]'>
									<img src={Vector} alt='' />
								</span>
								<span className='inline-block w-[80%]'>Dashboard</span>
							</NavLink>
						</li>

						<li className='mb-8'>
							<NavLink
								to={`/admin/registerdriver`}
								className={({ isActive }) =>
									isActive
										? 'bg-[#EC8F22] text-white font-semibold rounded-md  inline-flex items-center  p-4 w-[200px] h-[40px] relative'
										: 'font-semibold text-[#607A8E] inline-flex items-center justify-center w-[200px] p-4 h-[40px] relative'
								}
								end
							>
								<span className='inline-block w-[20%]'>
									<img src={UserPlus} alt='' />
								</span>
								<span className='inline-block w-[80%]'>Add a driver</span>
							</NavLink>
						</li>

						<li className='mb-8'>
							<NavLink
								to={`/admin/pricing`}
								className={({ isActive }) =>
									isActive
										? 'bg-[#EC8F22] text-white font-semibold rounded-md p-4  inline-flex items-center  w-[200px] h-[40px] relative'
										: 'font-semibold  text-[#607A8E] inline-flex p-4 items-center justify-center w-[200px] h-[40px] relative'
								}
								end
							>
								<span className='inline-block w-[20%]'>
									<img src={MoneyBill} alt='' />
								</span>
								<span className='inline-block w-[80%]'>Pricing</span>
							</NavLink>
						</li>

						<li className='mb-8'>
							<NavLink
								to={`/admin/trips`}
								className={({ isActive }) =>
									isActive
										? 'bg-[#EC8F22] text-white font-semibold rounded-md  inline-flex items-center  p-4 w-[200px] h-[40px] relative'
										: 'font-semibold text-[#607A8E] inline-flex items-center justify-center w-[200px] p-4 h-[40px] relative'
								}
								end
							>
								<span className='inline-block w-[20%]'>
									<img src={UserPlus} alt='' />
								</span>
								<span className='inline-block w-[80%]'>Trips</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
