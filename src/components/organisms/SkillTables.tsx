import {useState, useEffect} from 'react';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';

import SkillTable from './SkillTable';
import DeleteDialog from '../shared/DeleteDialog';
import {
	postCategry,
	getCategories,
	deleteCategory
} from '../../apis/skills.api';


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