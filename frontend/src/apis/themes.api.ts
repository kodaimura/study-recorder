import {responseFilter} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const getThemeForYear = (
    year: number,
) => {
    return fetch(`${apiurl}/themes/year?year=${year}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}


export const postThemeForYear = (
    year: number,
    theme: string
) => {
    return fetch(`${apiurl}/themes/year`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            year, theme
        })})
    .catch(console.error);
}


export const getThemeForMonth = (
    year: number,
    month: number,
) => {
    return fetch(`${apiurl}/themes/month?year=${year}&month=${month}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}


export const postThemeForMonth = (
    year: number,
    month: number,
    theme: string
) => {

    return fetch(`${apiurl}/themes/month`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            year, month, theme
        })})
    .catch(console.error);
}