import React, {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';

import SkillTable from './SkillTable';
import DeleteDialog from '../../shared/DeleteDialog';

import {SkillCategory} from '../../../types/types';
import {
	postCategry,
	getCategories,
	deleteCategory
} from '../../../apis/skills.api';


export const Skills = () => {
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
        {categories.map((category: SkillCategory, index: number) => (
        	<div key={index}>
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
        	
        	<SkillTable category={category} />
        	</div>
        ))}
        </div>
	);
}