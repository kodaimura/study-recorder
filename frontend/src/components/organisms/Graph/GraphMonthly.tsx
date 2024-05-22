import React, {useState,useEffect} from 'react';
import { Chart } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { toHour, msToHs } from '../../../utils/utils';
import {Record} from '../../../types/types';

import { apiGet } from '../../../utils/api';


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


const toCumulative = (
    ls: number[]
) => {
    for (let i = 2; i < 32; i++){
        ls[i] = ls[i - 1] + ls[i]
    }
    return ls
}


//data: ソート済み
const makeData = async (
    data: Record[],
 ) => {
    let plotData = [];
    let year = (data.length)? data[0].year : 0;
    let month = (year)? data[0].month : 0;

    let arr = await Array(32);
    arr.fill(0);

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push(toCumulative(arr));
            year = d.year;
            month = d.month;
            arr = await Array(32)
            arr.fill(0);
        }
        arr[d.day] = d.minuteTime;
    }

    //最終月はを先頭を1とする(makeDatasetsで最終月を判断するため)
    arr[0] = 1
    plotData.push(toCumulative(arr));

    return await plotData
}


const makeDatasets = (
    data: number[][],
    year: number,
    month: number
) => {
    return data.map(d => {
        //最終月は色を変える
        if (d[0] !== 0) {
            return {
                label: String(year) + "-" + String(month),
                type: 'line' as any,
                data: d,
                backgroundColor: 'rgba(255, 80, 100, 0.4)',
                borderColor: 'rgb(255, 80, 100)',
                borderWidth: 5,
            }
        } else {
            return {
                type: 'line' as any,
                data: d,
                borderColor: 'rgb(150, 150, 150)',
                borderWidth: 3,
            }
        }

    })
}


const makePlotData = (
    data: number[][],
    timeUnit: string,
    year: number,
    month: number
) => {
    if (timeUnit === "h") {
        data = data.map(d => msToHs(d))
    } 
    let d = makeDatasets(data, year, month);

    return {
        labels: [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: d
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
    	},
        plugins: {
            legend: {
                labels: {
                    filter: (item: any) => item.text !== undefined
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


const GraphMonthly = (props: {
  	timeUnit: string,
}) => {
    const timeUnit = props.timeUnit;
    const [data, setData] = useState([] as any[]);
    const [dataMonthly, setDataMonthly] = useState([[]] as any[][]);
    const [plotData, setPlotData] = useState({datasets:[]} as any);
    const [plotOptions, setPlotOptions] = useState(makePlotOptions(6000));
    const [total, setTotal] = useState(0);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);


    useEffect(() => {
        (async () => {
            const records = await apiGet('records');
            records.sort(compareDate);
            setData(records);
        })();
        
    }, []);

    useEffect(() => {
        makeData(data)
        .then(d => {
            setDataMonthly(d)
        })

        if (data.length !== 0) {
            setMonth(data.slice(-1)[0].month);
            setYear(data.slice(-1)[0].year);
        }
    }, [data]);


    useEffect(() => {
        setTotal(dataMonthly.slice(-1)[0].slice(-1)[0]);
    }, [dataMonthly]);


    useEffect(() => {
        setPlotData(makePlotData(dataMonthly, timeUnit, year, month))
    }, [dataMonthly, timeUnit]);


    useEffect(() => {
        setPlotOptions(makePlotOptions((timeUnit === "m")? 6000 : 100));
    }, [timeUnit]);


  	return (
  		<Content>
  		<TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
        <TableRow>
        	<CustomTableCell >
        	{year}-{month} Total: {
                (timeUnit === "m")? total :
                 toHour(total)}[{timeUnit}]
        	</CustomTableCell >
        </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
        	<TableCell>
        	<div  style={{ position: "relative", margin: "auto", width: "95%"}}>
        	<Chart type='line' data={plotData} options={plotOptions} />
        	</div>
        	</TableCell>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
        </Content>
  	);
}

export default GraphMonthly;