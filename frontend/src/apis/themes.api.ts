import {handleError, handleResponse} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const getThemeForMonth = async (year: number, month: number) => {
    return fetch(`${apiurl}/themes?year=${year}&month=${month}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(handleResponse)
	.catch(handleError);
}


export const postThemeForMonth = async (
    year: number,
    month: number,
    theme: string
) => {

    return fetch(`${apiurl}/themes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            year, month, theme
        })
    })
    .then(handleResponse)
	.catch(handleError);
}


export const getThemeForYear = async (year: number) => {
    return getThemeForMonth(year, 0)
}


export const postThemeForYear = async (year: number, theme: string) => {
    return postThemeForMonth(year, 0, theme)
}