import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'antd/dist/reset.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
