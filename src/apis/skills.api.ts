import {responseFilter} from '../utils/utils';
import {apiurl} from '../utils/constants';


export const postSkill = (
	categoryId: number,
	skillNo: number | undefined,
	item1: string,
	item2: string,
	comment: string,
) => {

	let postData: any = {categoryId, item1, item2, comment};
	if (skillNo) postData.skillNo = skillNo;

	return fetch(`${apiurl}/skills`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify(postData)
    }).catch(console.error);
}

export const putCategry = (
	categoryId: number,
	categoryName: string
) => {

	return fetch(`${apiurl}/skills/categories`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify({categoryId, categoryName})
    }).catch(console.error);
}

export const getSkills = (
	categoryId: number
) => {
	return fetch(`${apiurl}/skills?categoryId=${categoryId}`, {
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}

export const getCategory = (
	categoryId: number
) => {
	return fetch(`${apiurl}/skills/categories?categoryId=${categoryId}`, {
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}


export const deleteSkill = (
	skillNo: number
) => {
	return fetch(`${apiurl}/skills/${skillNo}`, {
		method: "DELETE",
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}


export const getCategories = () => {
	return fetch(`${apiurl}/skills/categories`, {
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}


export const postCategry = (
	categoryName: string
) => {

	return fetch(`${apiurl}/skills/categories`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify({categoryName})
    }).catch(console.error);
}


export const deleteCategory = (
	categoryId: number
) => {
	return fetch(`${apiurl}/skills/categories/${categoryId}`, {
		method: "DELETE",
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.catch(console.error);
}