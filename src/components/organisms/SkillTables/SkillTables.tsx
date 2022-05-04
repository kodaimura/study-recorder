import {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';

import SkillTable from './SkillTable';
import {responseFilter} from '../../../utils/utils';
import {apiurl} from '../../../utils/constants';
import DeleteDialog from '../../parts/DeleteDialog';


const getCategories = () => {
	return fetch(`${apiurl}/skills/categories`, {
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}


const postCategry = (
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


const deleteCategory = (
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


const SkillTables = () => {
	const [categories, setCategories] = useState([]);
	const [reload, setReload] = useState(1);
	const [categoryName, setCategoryName] = useState("");


	useEffect(() => {
 	 	getCategories()
 	 	.then(data => {
 	 		(data)? setCategories(data)
            : setCategories([]);
        })
    }, [reload]);


	return (
		<div>
		<Input
			value={categoryName}
        	onChange={(e) => {
          		setCategoryName(e.target.value)
        	}} 
        /> 
		<IconButton 
			onClick={
				() => {
		 			postCategry(categoryName)
					.then(response => {
						setCategoryName("");
						setReload(reload * -1)
					});
        		}
        	}>
		<AddIcon />
		</IconButton>
		<br/>
        {categories.map((category: {
        	categoryId: number,
        	categoryName: string,
  		}, index: number) => (
        	<>
        	<br/>
        	<DeleteDialog 
        		head="削除しますか？" 
        		body={category.categoryName} 
        		handler={
        			() => {
		 				deleteCategory(category.categoryId)
        				.then(response => {
        					setCategories([])
        					setReload(reload * -1)
        				})
        			}
        		}/>
        	
        	<SkillTable category={category} key={index} />
        	</>
        ))}
        </div>
	);
}

export default SkillTables;