import React, { ReactElement, FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'

const Home: FC<any> = (): ReactElement => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const navigate = useNavigate();
	const signup = () => {
		navigate('/signup');
	};
	return (
		<>

			<header className="text-black">
				{' '}
				<nav className='flex items-center justify-between px-8 md:px-32 py-2' aria-label='Global'>
					{' '}
					<div className='flex lg:flex-1'>
						{' '}
						<div className='flex justify-center items-center -m-1.5 p-1.5'>
							{' '}
							<span className='sr-only'>Your Company</span>{' '}
							<img className='h-16 md:h-32 w-auto rounded-full' src='emovelogo.png' alt='' />{' '}
							<h1 className="text-2xl md:text-4xl font-bold">E-Move</h1>
						</div>{' '}
					</div>{' '}
					<div className='flex lg:hidden'>
						{' '}
						<button
							type='button'
							className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
							onClick={() => setMobileMenuOpen(true)}
						>
							{' '}
							<span className='sr-only'>Open main menu</span>{' '}
							<Bars3Icon className='h-6 w-6' aria-hidden='true' />{' '}
						</button>{' '}
					</div>{' '}
					<div className='text-black hidden lg:flex lg:justify-end'>
						{' '}
						<Link to='/login' className='text-sm font-semibold leading-6 text-black'>
							{' '}
							About
						</Link>{' '}
					</div>{' '}
					<div className='hidden ml-8 lg:flex lg:justify-end'>
						{' '}
						<Link to='/login' className='text-sm font-semibold leading-6 text-black'>
							{' '}
							Log in 
						</Link>{' '}
					</div>{' '}
					<div className='bg-[#f79009] hidden ml-8 lg:flex  lg:justify-end px-12 py-3 rounded-md' onClick={signup}>
						{' '}
						<Link to='/signup' className='text-sm font-semibold leading-6 text-white'>
							{' '}
							Get started 
						</Link>{' '}
					</div>{' '}
				</nav>{' '}
				<Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
					{' '}
					<div className='fixed inset-0 z-50' />{' '}
					<Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
						{' '}
						<div className='flex items-center justify-between'>
							{' '}
							<a href='#' className='-m-1.5 p-1.5'>
								{' '}
								<span className='sr-only'>Your Company</span>{' '}
								<img className='h-16 w-auto rounded-full' src='logo.png' alt='' />{' '}
							</a>{' '}
							<button
								type='button'
								className='-m-2.5 rounded-md p-2.5 text-gray-400'
								onClick={() => setMobileMenuOpen(false)}
							>
								{' '}
								<span className='sr-only'>Close menu</span>{' '}
								<XMarkIcon className='h-6 w-6' aria-hidden='true' />{' '}
							</button>{' '}
						</div>{' '}
						<div className='mt-6 flow-root'>
							{' '}
							<div className='-my-6 divide-y divide-gray-500/25'>
								{' '}
								<div className='py-6'>
									{' '}
									<Link
										to='/login'
										className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-800'
									>
										{' '}
										About {' '}
									</Link>{' '}
								</div>{' '}
								<div className='py-6'>
									{' '}
									<Link
										to='/login'
										className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-800'
									>
										{' '}
										Log in{' '}
									</Link>{' '}
								</div>{' '}
								<div className='py-6'>
									{' '}
									<Link
										to='/signup'
										className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-800'
									>
										{' '}
										Get Started{' '}
									</Link>{' '}
								</div>{' '}
							</div>{' '}
						</div>{' '}
					</Dialog.Panel>{' '}
				</Dialog>{' '}
			</header>

			<div className='flex flex-col md:flex-row items-center justify-between w-full px-8 md:px-32 pb-8 md:pb-40 bg-[#fcfcfd]'>
				<div>
					<div>
						<h1>
							{' '}
							<strong className='font-extrabold text-[3rem]'>Need to go out?</strong>
						</h1>

						<div className='mt-8 text-[#667085] text-lg'>
							<p>You no longer need cash! Make payment</p>
							<p>to go your daily routes via E-move</p>
						</div>
					</div>

					<div className='mt-5'>
						<button className='bg-slate-100 p-4 rounded-full'>How to book a trip</button>
						<ul className='mt-5 p-0 m-0 '>
							<li className='flex '>
								<img src='Polygon 6.png' alt='' />
								<span className='ml-5'> Pick a route</span>
							</li>
							<li className='flex mt-5'>
								<img src='Polygon 6.png' alt='' /> <span className='ml-5'>Make your booking</span>
							</li>
							<li className='flex mt-5'>
								<img src='Polygon 6.png' alt='' />{' '}
								<span className='ml-5'>Board a registered vehicle</span>
							</li>
							<li className='flex mt-5'>
								<img src='Polygon 6.png' alt='' /> <span className='ml-5'>Make payment</span>
							</li>
							<li className='flex mt-5'>
								<img src='Polygon 6.png' alt='' />{' '}
								<span className='ml-5'>Arrive at your destination safely</span>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-8 md:mt-0'>
					<img src='image 2.png' alt='' />
				</div>
			</div>

			<footer className='bg-[#f2f4f7] '>
				<div>
					<div className='flex items-center justify-center py-4'>
						<img src='emovelogo.png' alt='' />
						<div className='font-bold text-[2rem]'>E-Move</div>
					</div>
					<div className='flex items-center justify-center'>
						<a href='#'>
							<h6 className='ml-4'>About</h6>{' '}
						</a>
						<a href='#'>
							<h6 className='ml-4'>Privacy</h6>
						</a>
						<a href='#'>
							<h6 className='ml-4'>FAQ</h6>
						</a>
					</div>

					<div className=' block md:flex md:items-center md:justify-between md:mx-32 px-0 md:px-16 py-8 border-t-2 border-slate-400 mt-2'>
						<p className='text-center'>All rights reserved. &copy;2023 E-move </p>
						<div className=''>
							<div className='flex justify-center space-x-4'>
								<img className='p-2 rounded-3xl bg-[#dcdee2]' src='insta.svg' alt='instagram' />
								<img className='p-2 rounded-3xl bg-[#dcdee2]' src='twiter.svg' alt='twitter' />
								<img className='p-2 rounded-3xl bg-[#dcdee2]' src='youtube.svg' alt='youtube' />
							</div>
							<p className='mt-2 text-center'>Help@emove.com</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Home;
