import {handleError, handleResponse} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const postRecord = async (
	year: number,
	month: number,
	day: number,
	comment: string,
	minuteTime: number
) => {
	minuteTime = Number.isNaN(minuteTime)? 0 : minuteTime; 
		
	return fetch(`${apiurl}/records`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify({year, month, day, minuteTime, comment})
    })
	.then(handleResponse)
	.catch(handleError);
}


export const requestRecord = async () => {
	return fetch(`${apiurl}/records/record`, {
		method: "POST",
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(handleResponse)
	.catch(handleError);
}


export const getRecordStartTime = async () => {
	return fetch(`${apiurl}/records/record/start_time`, {
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(handleResponse)
	.catch(handleError);
}


export const getRecordsByYearMonth = async (year: number, month: number) => {
	return fetch(`${apiurl}/records?year=${year}&month=${month}`, {
      	headers: {
          	"Content-Type": "application/json",
          	Authorization: `Bearer ${localStorage.token}`
      	}
    })
    .then(handleResponse)
	.catch(handleError);
}


export const getRecords = async () => {
    return await fetch(`${apiurl}/records`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(handleResponse)
	.catch(handleError);
}
