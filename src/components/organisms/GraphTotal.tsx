import {useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {Record} from '../../types/types';

import {toHour, msToHs, getMinuteTotal} from '../../utils/utils';

import {
    getRecords,
} from '../../apis/records.api'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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


//data: ソート済み
const makePlotData = (
	data: Record[],
 ) => {
    let plotData = [0];
    let year = (data.length)? data[0].year : 0;
    let month = (year)? data[0].month : 0;

    let total = 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push(total);
            year = d.year;
            month = d.month;
        }
        total += d.minuteTime;
    }

    plotData.push(total);

    return plotData;
}


//data: ソート済み
const makePlotLabels = (
    data: Record[],
 ) => {
    let labels = [""];
    let year = (data.length)? data[0].year : 0;
    let month = (year)? data[0].month : 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            labels.push(String(year) + "/" + String(month));
            year = d.year;
            month = d.month;
        }    
    }

    labels.push(String(year) + "/" + String(month));

    return labels;
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


const makeLineChartData = (
	plotData: number[],
    plotLabels: string[],
    timeUnit: string
) => {
    if (timeUnit === "h") {
        plotData = msToHs(plotData)
    } 

    return {
        labels: plotLabels,
        datasets: makeDatasets(plotData)
    };
}


const makeLineChartOptions = (
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


const GraphTotal = (plops: {
	timeUnit: string
})=> {
	const timeUnit = plops.timeUnit;
    const [data, setData] = useState([]);
    const [plotData, setPlotData] = useState(makePlotData([]));
    const [plotLabels, setPlotLabels] = useState(makePlotLabels([]));
	const [lineChartData, setLineChartData] = useState(makeLineChartData([], [], timeUnit));
	const [plotOptions, setPlotOptions] = useState(makeLineChartOptions(6000));
	const [total, setTotal] = useState(0);


 	useEffect(() => {
 		getRecords()
 		.then(records => {
            setTotal(getMinuteTotal(records));
            records.sort(compareDate);
            setData(records);
        });
	}, []);


    useEffect(() => {
        setPlotData(makePlotData(data))
        setPlotLabels(makePlotLabels(data))
    }, [data]);


    useEffect(() => {
        setLineChartData(makeLineChartData(plotData, plotLabels, timeUnit))
    }, [plotData, plotLabels, timeUnit]);


    useEffect(() => {
        setPlotOptions(makeLineChartOptions((timeUnit === "m")? 6000 : 100));
    }, [timeUnit]);


    return (
        <TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
        <TableRow>
            <CustomTableCell>
            Total: {(timeUnit === "m")? total : toHour(total)}[{timeUnit}]
            </CustomTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell>
            <div style={{ position: "relative", margin: "auto", width: "95%"}}>
            <Line data={lineChartData} options={plotOptions} />
            </div>
            </TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
    );
}


export default GraphTotal;