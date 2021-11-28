import {useState,useEffect} from 'react';
import { Line, } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {parseResponse, getMinuteTotal, toHour} from '../../../utils/utils';
import {apiDomain} from '../../../utils/constants';


const getRecords = (
	year: number,
	month: number
) => {
  	return fetch(`${apiDomain}/records?year=${year}&month=${month}`, {
      	headers: {
          	"Content-Type": "application/json",
          	Authorization: `Bearer ${localStorage.token}`
      	}
    })
    .then(parseResponse)
    .catch(console.error);
}


const makeDataAndLabels = async (
  	year: number,
  	month: number,
  	data: {
  		day: number,
  		minuteTime: number
  	}[],
  	timeUnit: string
) => {
  	const lastDay = (new Date(year, month, 0)).getDate();
  	const array = await Array(lastDay + 1);
  	const labels = await Object.keys([...array]);
  	let times = array;
  	times.fill(0);

  	for (let d of data){
    	times[d.day] = d.minuteTime;
  	}

  	for (let i = 1; i <= lastDay + 1; i++){
  		
    	times[i] = (timeUnit === "m")? 
    		times[i - 1] + times[i]
    		:times[i - 1] + (times[i]/ 60 * 10000) / 10000;
  	}

  	return {labels, data:times};
}


const makeDatasets = (
  	data: number[]
) => {
  	return [
    	{
        	label: "Month Time",
        	data: data,
        	backgroundColor: 'rgba(0, 204, 255, 0.2)',
        	borderColor: 'rgb(0, 204, 255)',
        	borderWidth: 5,
      	}
  	]
}


const makePlotData = async(
  	year: number,
  	month: number,
  	data: {
		day: number,
		minuteTime: number
	}[],
  	timeUnit: string
) => {

  	return makeDataAndLabels(year, month, data, timeUnit)
  	.then(dataAndLabels => {
  		return {
  			datasets: makeDatasets(dataAndLabels.data),
  			labels: dataAndLabels.labels
  	}});
}


const makePlotOptions = (
  	stepSize: number
) => {
  	return {
    	scales: { 
        	yAxes: {
          		gridLines: {
            		color: "rgba(0, 0, 255, 0.2)", 
                	zeroLineColor: "black"
            	},
            	ticks: {
              		stepSize: stepSize,          
               	 	fontColor: "blue",
            	}
        	}
    	}
  	}
}

const Content = styled('div') ({
	backgroundColor: "white",
})

const CustomTableCell = styled(TableCell) (props => ({ 
	backgroundColor: "black",
    color: "white",
    fontSize: 20,
}))


const MonthlyGraph = (props: {
  	year:number, 
  	month: number, 
  	timeUnit: string,
}) => {
  	const timeUnit = props.timeUnit;
  	const year = props.year;
  	const month = props.month;
  	const [data, setData] = useState([]);
  	const [plotData, setPlotData] = useState({labels:["1"], datasets: makeDatasets([1])});
  	const [plotOptions, setPlotOptions] = useState(makePlotOptions(6000));
  	const [total, setTotal] = useState(0);


  	useEffect(() => {
    	getRecords(year, month)
    	.then(data => setData(data));
  	}, []);


  	useEffect(() => {
  		makePlotData(year, month, data, timeUnit)
  		.then(setPlotData);

        setTotal(getMinuteTotal(data));
        setPlotOptions(makePlotOptions((timeUnit === "m")? 6000 : 10));
  	}, [data, timeUnit]);


  	return (
  		<Content>
  		<TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
        <TableRow>
        	<CustomTableCell >
        	Monthly Total: {
                (timeUnit === "m")? total :
                 toHour(total)}[{timeUnit}]
        	</CustomTableCell >
        </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
        	<TableCell>
        	<div  style={{ position: "relative", margin: "auto", width: "95%"}}>
        	<Line data={plotData} options={plotOptions} />
        	</div>
        	</TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        </Content>
  	);
}

export default MonthlyGraph;