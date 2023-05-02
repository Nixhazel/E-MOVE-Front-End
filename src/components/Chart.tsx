import React from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import toast from 'react-hot-toast'

interface BarChartProps {
	data: Array<[string, number]>;
	title: string;
}
type Props = {};

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
	const chartData = [['Label', 'Value'], ...data.map(([label, value]) => [label, value])];

	const getDriverCount = async (): Promise<number> => {
		try {
			const response = await axios.get('/api/v1/admin/getAllDrivers');
			const driverCount = response.data.length;
			toast.success(`There are ${driverCount} drivers.`);
			return driverCount;
		} catch (error) {
			toast.error('Error fetching driver count:');
			throw error;
		}
	};

	return (
		<div>
			<Chart
				chartType='ColumnChart'
				data={chartData}
				options={{
					title,
					legend: { position: 'none' },
					vAxis: {
						title: 'Value',
						formatOptions: { prefix: 'N', groupingSymbol: ',' }
					},
					hAxis: {
						title: 'Month'
					},
					series: {
						0: { color: '#6EE7B7' } // set color for series 0 (the bars)
					}
				}}
				width='100%'
				height='300px'
			/>
		</div>
	);
};

export default BarChart;
