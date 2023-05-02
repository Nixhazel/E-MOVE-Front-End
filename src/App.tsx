import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css'
import Forgetpassword from './pages/Forgetpassword';
import Emailconfirmpassword from './pages/Emailconfirmpassword';
import Resetpassword from './pages/Resetpassword';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';

import Registerdriver from './pages/Registerdriver';
import Alldrivers from './pages/Alldrivers';
import Editdriver from './pages/Editdriver';
import Passengerdashboard from './pages/Passengerdashboard';
import Tripdeatails from './pages/Tripdeatails';
import Triphistory from './pages/Triphistory';
import PrivateRoute from './auth';

import Userdashboard from './pages/Userdashboard';

import Pricing from './pages/pricing/Pricing';
import Trips from './pages/trips/Trips';
import AdminDashB from './pages/AdminDashB';


function App() {
	const { loading } = useSelector((state: any) => state.alerts);
	return (
		<>
			{loading && <Loading />}

			<Toaster position='top-center' reverseOrder={false} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />

				<Route path='/userDashboard' element={<Userdashboard />} />
				<Route path='/forgotpassword' element={<Forgetpassword />} />
				<Route path='/emailconfirmpassword' element={<Emailconfirmpassword />} />
				<Route path='/resetpassword' element={<Resetpassword />} />


				<Route path="/admin/registerdriver" element={<PrivateRoute />}>
					<Route path='/admin/registerdriver' element={<Registerdriver />} />
				</Route>

				
				<Route path="/admin/pricing" element={<PrivateRoute />}>
					<Route path='/admin/pricing' element={<Pricing />} />
				</Route>

				
				<Route  path="/editdriver/:driverId" element={<PrivateRoute />}>
					<Route path='/editdriver/:driverId' element={<Editdriver />} />
				</Route>
				<Route  path="/admin/trips" element={<PrivateRoute />}>
					<Route path='/admin/trips' element={<Trips />} />
				</Route>
				<Route  path="/admin" element={<PrivateRoute />}>
					<Route path='/admin' element={<AdminDashB />} />
				</Route>
				

				<Route  path="/admin/alldrivers" element={<PrivateRoute />}>
					<Route path='/admin/alldrivers' element={<Alldrivers />} />
				</Route>
				
				<Route  path="/passengerDashboard" element={<PrivateRoute />}>
				<Route path='/passengerDashboard' element={<Passengerdashboard />} />
				</Route>

				<Route  path="/tripDetails/:id" element={<PrivateRoute />}>
					<Route path='/tripDetails/:id' element={<Tripdeatails />} />
					</Route>
				
				<Route path='/triphistory' element={<PrivateRoute />} >
					<Route path='/triphistory' element={<Triphistory />} />
				</Route>
				

			</Routes>

		</>
	);
}

export default App;
