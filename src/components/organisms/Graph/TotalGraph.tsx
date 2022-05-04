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

import {responseFilter, getMinuteTotal, toHour} from '../../../utils/utils';
import {apiurl} from '../../../utils/constants';
import {Record} from '../../../types/types';


const getRecords = () => {
    return fetch(`${apiurl}/records`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}


const compareDate = (
    a: {
    	year: number,
    	month: number,
    	day: number
	}, 
    b: {
    	year: number,
    	month: number,
    	day: number
	}
):number => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return (a.day < b.day)? -1 : 1;
}


const makeDataAndLabels = (
	data: Record[],
    timeUnit: string
 ) => {
	data.sort(compareDate);
    let labels = [""];
    let times = [0];
    let year = (data.length)? data[0].year : 0;
    let month = (year)? data[0].month : 0;

    let monthTotal = 0;

    for (let d of data) {
        if (year === d.year && month === d.month) {
            monthTotal += d.minuteTime;
        } else {
            if (timeUnit === "m") {
            times.push(monthTotal);
            }else {
                times.push(Math.round(monthTotal / 60 * 10000) / 10000);
            }

            labels.push(String(year) + "/" + String(month));
            year = d.year;
            month = d.month;
        }    
    }

    if (timeUnit === "m") {
        times.push(monthTotal);
    }else {
        times.push(Math.round(monthTotal / 60 * 10000) / 10000);
    }
    labels.push(String(year) + "/" + String(month));

    return {labels, data: times};
}


const makeDatasets = (
	data: number[]
) => {
	return [{
		label: "Total Time",
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 5,
    }];
}


const makePlotData = (
	data: Record[],
    timeUnit: string
) => {
	const dataAndLabels = makeDataAndLabels(data, timeUnit);

    return {
        labels: dataAndLabels.labels,
        datasets: makeDatasets(dataAndLabels.data)
    };
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

const CustomTableCell = styled(TableCell) (props => ({ 
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
}))


const TotalGraph = (plops: {
	timeUnit: string
})=> {
	const timeUnit = plops.timeUnit;
    const [data, setData] = useState([]);
	const [plotData, setPlotData] = useState(makePlotData([], timeUnit));
	const [plotOptions, setPlotOptions] = useState(makePlotOptions(6000));
	const [total, setTotal] = useState(0);


 	useEffect(() => {
 		getRecords()
 		.then(data => setData(data));
	}, []);


    useEffect(() => {
        setTotal(getMinuteTotal(data));
        setPlotData(makePlotData(data, timeUnit));
        setPlotOptions(makePlotOptions((timeUnit === "m")? 6000 : 100));
    }, [timeUnit, data]);


    return (
        <TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
        <TableRow>
            <CustomTableCell>
            Total: {
                (timeUnit === "m")? total 
                : toHour(total)}[{timeUnit}]
            </CustomTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>
            <div style={{ position: "relative", margin: "auto", width: "95%"}}>
            <Line data={plotData} options={plotOptions} />
            </div>
            </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
    );
}


export default TotalGraph;