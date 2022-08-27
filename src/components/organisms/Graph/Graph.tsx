import { useState } from 'react';
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
} from 'chart.js';

import Button from '@mui/material/Button';

import GraphMonthly from './GraphMonthly';
import GraphTotal from './GraphTotal';


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


export const Graph = (props: {
	year: number, 
	month: number,
})=> {
	const [mode, setMode] = useState(1);
	const [timeUnit, setTimeUnit] = useState("h");

	return (
		<>
		<Button 
			variant="text" 
			size="large" 
			onClick={()=> (timeUnit === "m")? setTimeUnit("h") : setTimeUnit("m")} 
		>
		{(timeUnit === "m")? "m → h" : "h → m"}
		</Button>

		<Button 
			variant="text" 
			size="large" 
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