import {responseFilter} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const getGoalForYear = (
    year: number,
) => {
    return fetch(`${apiurl}/goals/year?year=${year}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}


export const postGoalForYear = (
    year: number,
    goal: string
) => {
    return fetch(`${apiurl}/goals/year`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            year, goal
        })})
    .catch(console.error);
}


export const getGoalForMonth = (
    year: number,
    month: number,
) => {
    return fetch(`${apiurl}/goals/month?year=${year}&month=${month}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(responseFilter)
    .catch(console.error);
}


export const postGoalForMonth = (
    year: number,
    month: number,
    goal: string
) => {

    return fetch(`${apiurl}/goals/month`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            year, month, goal
        })})
    .catch(console.error);
}