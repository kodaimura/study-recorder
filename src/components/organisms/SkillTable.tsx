import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import DeleteDialog from '../shared/DeleteDialog';

import {
    getSkills,
    postSkill,
    deleteSkill,
    getCategory,
    putCategry,
} from '../../apis/skills.api';


type Skill = {
	skillNo: number | undefined,
	categoryId: number,
	item1: string,
	item2: string,
	comment: string
}

type SkillCategory = {
	categoryId: number,
	categoryName: string
}


const StyledCell = styled(TableCell) (props => ({ 
	backgroundColor: "black",
    color: "white",
    fontSize: 20,
    width: props.width,
}))

const StyledInput = styled(Input) ({
	color: "black",
	fontSize: 20,
	backgroundColor: "#D0D0D0"
})

const CustomCell = styled(TableCell) ({
	borderRight: "1px solid rgba(224, 224, 224, 1)"
})

const CustomInput = styled(Input) ({
	fontSize: "1rem",
	backgroundColor: "#F0F0F0"
})


const SkillTable = (props:{
	category: SkillCategory,
}) => {
	const [skill, setSkill] = useState<Skill[]>([]);
	const [reload, setReload] = useState(1);
	const [target, setTarget] = useState(NaN);
	const [item1, setItem1] = useState("");
	const [item2, setItem2] = useState("");
	const [comment, setComment] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const navigate = useNavigate();


	useEffect(() => {
 	 	getSkills(props.category.categoryId)
 	 	.then(data => {
 	 		if (data) {setSkill(data)}
 	 	});

 	 	getCategory(props.category.categoryId)
 	 	.then(data => {
 	 		if (data && data.length !== 0) {
 	 			setCategoryName(data[0].categoryName);
 	 		} else {
 	 			navigate(0);
 	 		}
 	 	});

	}, [reload, props.category.categoryId]);


	return (
		<TableContainer component={Paper}>
		<Table size="small">
        <TableHead>
        <TableRow>
        <StyledCell width="150px">
        {(target === -1)? 
            <StyledInput
            	size="small"
            	defaultValue={props.category.categoryName} 
            	onChange={(e) => setCategoryName(e.target.value)}
            /> 
            : categoryName}
        </StyledCell>
        <StyledCell width="150px">
        {(target === -1)? 
            <Button 
            	size="small"
            	startIcon={<SaveIcon/>}
            	onClick={
            		() => {
            			putCategry(
            				props.category.categoryId,
            				categoryName
            			).then(response => {
           					setReload(reload * -1);
           					setTarget(NaN);
           				});
        			}
            	} 
            >Save</Button> : ""}
        </StyledCell>
        <StyledCell width="200px"></StyledCell>
        <StyledCell width="30px">
        </StyledCell>
        <StyledCell width="20px">
        	<IconButton 
        		size="small" 
        		onClick={() => setTarget((target === -1)? NaN : -1)}>
            <EditIcon color="primary"/>
            </IconButton>
        </StyledCell>
        <StyledCell width="20px">
        	<IconButton 
            	size="small"
        		onClick={() => {
        			setSkill(
        				skill.concat({
							skillNo: undefined,
							categoryId: props.category.categoryId,
							item1: "",
							item2: "",
							comment: ""
						})
					)
        		}}>
			<AddIcon color="primary"/>
			</IconButton>
        </StyledCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {skill.map((row: Skill, index: number) => (
       		<TableRow
            	key={index}
            >
            
            <CustomCell align="left">
            {(target === index)? 
                <CustomInput
                    size="small"
                    fullWidth
                    defaultValue={row.item1} 
                    onChange={(e) => setItem1(e.target.value)}
                /> 
                : row.item1} 
            </CustomCell>
            <CustomCell align="left">
            {(target === index)?
                <CustomInput 
                    size="small"
                    fullWidth
                    defaultValue={row.item2} 
                    onChange={(e) => setItem2(e.target.value)}
                /> 
                : row.item2}
            </CustomCell>
            <CustomCell 
            	align="left"
            	style={{ whiteSpace: "pre-wrap"}}>
            {(target === index)?
                <CustomInput
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={row.comment} 
                    onChange={(e) => setComment(e.target.value)}
                /> 
                : row.comment}
            </CustomCell>
            <TableCell align="center">
            {(target === index)? 
            	<Button 
            		size="small"
            		startIcon={<SaveIcon/>} 
            		onClick={() => {
            			postSkill(
            				row.categoryId, 
            				row.skillNo, 
            				item1,
            				item2, 
            				comment
            			).then(response => {
            				setReload(reload * -1);
            				setTarget(NaN);
            			});
            		}}>Save</Button> 
           		: ""}
            </TableCell>
            <TableCell align="center">
           		<IconButton 
           			size="small"
              		onClick={() => {
              			if (target !== index) {
              				setTarget(index);
              				setItem1(row.item1);
 	 						setItem2(row.item2);
 	 						setComment(row.comment);
              			} else {
              				setTarget(NaN)
              			}
              		}}
              	>
            	<EditIcon />
            	</IconButton>
            </TableCell>
            <TableCell align="center">
            {(target === index)? 
            <DeleteDialog 
        		head="削除しますか？" 
        		body={row.item1} 
        		handler={
        			() => {
						if (row.skillNo){
            				deleteSkill(row.skillNo)
        					.then(response => {
        						setReload(reload * -1);
        					})
        				}
        			}
        		}/>
           		: ""}
            </TableCell>
            </TableRow>
        ))}
        </TableBody>

      	</Table>
    	</TableContainer>
	);
}

export default SkillTable;