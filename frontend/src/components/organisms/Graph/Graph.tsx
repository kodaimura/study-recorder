import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables as registerablesJS
} from 'chart.js';

import Button from '../../atoms/Button';

import GraphMonthly from './GraphMonthly';
import GraphTotal from './GraphTotal';

ChartJS.register(...registerablesJS);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Graph = (props: {
	year: number, 
	month: number,
	timeUnit: string
})=> {
	const timeUnit = props.timeUnit
	const [mode, setMode] = useState(1);

	return (
		<>
		<Button 
			className='btn-lg'
			onClick={() => setMode(mode * (-1))} 
		>
		{(mode === 1)? "Total Graph" : "Monthly Graph"}
		</Button>

		{(mode === 1)? 
			<GraphMonthly timeUnit={timeUnit} />
			:<GraphTotal timeUnit={timeUnit} />}
		
		</>
	);
}

export { Graph };