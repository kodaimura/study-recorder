import { useState } from 'react';
import Button from '@mui/material/Button';

import GraphMonthly from './GraphMonthly';
import GraphTotal from './GraphTotal';


const Graph = (props: {
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
			<GraphMonthly year={props.year} month={props.month} timeUnit={timeUnit} />
			:<GraphTotal timeUnit={timeUnit} />}
		</>
	);
}

export default Graph;