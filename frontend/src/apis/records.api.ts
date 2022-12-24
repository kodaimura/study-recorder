import {responseFilter} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const postRecord = (
	year: number,
	month: number,
	day: number,
	comment0: string | undefined,
	minuteTime0: string
) => {

	const comment: string = (comment0)? comment0 : ""; 
	const minuteTime: number = (minuteTime0)? parseInt(minuteTime0) : NaN; 

	if (Number.isNaN(minuteTime)){
		alert("Please enter an integer.");
	}
		
	return fetch(`${apiurl}/records`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify({year, month, day, minuteTime, comment})
    }).catch(console.error);
}


export const requestRecord = () => {
  	return fetch(`${apiurl}/records/record`, {
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(responseFilter)
  	.catch(console.error);
}


export const getRecordState = () => {
  	return fetch(`${apiurl}/records/state`, {
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(responseFilter)
  	.catch(console.error);
}


export const getRecordsByYearMonth = (
	year: number,
	month: number
) => {
  	return fetch(`${apiurl}/records?year=${year}&month=${month}`, {
      	headers: {
          	"Content-Type": "application/json",
          	Authorization: `Bearer ${localStorage.token}`
      	}
    })
    .then(responseFilter)
    .catch(console.error);
}


export const getRecords = () => {
    return fetch(`${apiurl}/records`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}
