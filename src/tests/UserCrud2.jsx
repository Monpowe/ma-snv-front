import React from 'react'
import { Button, Stack, TableContainer, Typography, Paper, Table, TableHead,
        TableBody, TableRow, TableCell, Container, Dialog, Box, TextField,
        FormControlLabel, Checkbox, styled} from '@mui/material';
// import styled from '@mui/material';

//import './crud.css';

const hostname= "http://localhost:3001/api/users/";


const UserContext = React.createContext();

const ACTIONS = {
    loadData:'loadData',
    dataLoaded:'dataloaded',
    setError:'setError',
    update:'update',
    new:'new',
    delete:'delete',
    select:'select'
}

const initialState = {
    data:[],
    loading:false,
    selectedItem:null,
    error:null
}

const reducer = (state, action)=>{
    let users = [];
    console.log(action);
    switch(action.type){
        case ACTIONS.loadData:
            return {...state, error:null,selectedItem:null,loading:true}
        case ACTIONS.dataLoaded:
            return {...state, data: action.payload.data, loading:false}
        case ACTIONS.setError:
            return {...state, error:action.payload.error, loading:false}
        case ACTIONS.new:
            users = [...state.data, action.payload.data];
            return {...state, data:users}
        case ACTIONS.update:
            const updatedUser = action.payload.data;
            users = state.data.map((user)=> user.id == updatedUser.id ? updatedUser : user);
            return {...state, data:users}
        case ACTIONS.select:
            return {...state, selectedItem:action.payload.selected}
        case ACTIONS.delete:
            const newdata = state.data.filter((user)=>user.id != action.payload.id);
            return {...state, data:newdata, selectedItem:null}
        default:
        return state


    }
}


const UserCrud = () => {

    const [formData, setFormData] = React.useState({});
    const [showForm, setShowForm] = React.useState(false);
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const handleDelete = ()=>{

        if(!state.selectedItem) return alert('Please select a record');

        deleteData(state.selectedItem.id);
       
    }

    const deleteData = async (id)=>{

        try {
            const res = await fetch(hostname + id, {method:'DELETE'});
            const dataId = await res.json();
            dispatch({type:ACTIONS.delete, payload:{id:dataId}})
          
        } catch (error) {
            dispatch({type:ACTIONS.setError, payload:{error:err.message}})
        }
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        if(!formData.lastname || !formData.firstname) return alert('lol');
        saveData(formData);

    }

    const saveData = async(body)=>{
            try{
                const res = await fetch(hostname, {method: body.id ? 'PUT' : 'POST', headers: {"Content-Type": "application/json",},body: JSON.stringify(body)});
                const d = await res.json();

                const action = body.id  ? ACTIONS.update : ACTIONS.new; 
            
                dispatch({type:action, payload:{data:d[0]}});
            }catch(error){
                dispatch({type:ACTIONS.setError, payload:{error:error.message}})
            }finally{
                setShowForm(false);
            }
    }

    const loadData = async()=>{

        dispatch({type:ACTIONS.loadData})
        try{
            const res = await fetch(hostname);

            console.log(res);
            if(!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            dispatch({type:ACTIONS.dataLoaded, payload:{data:data}})
        }catch(err){
            dispatch({type:ACTIONS.setError, payload:{error:err.message}})
        }
    }

    const handleUpdate = ()=>{
        if(!state.selectedItem) return alert('Please select a record');

        setFormData(state.selectedItem);
        setShowForm(true);
    }

    const handleNew=()=>{
        setFormData({});
        setShowForm(true);
    }



    React.useEffect(()=>{
    
        loadData();

    },[]);

  return (
    <Container maxWidth='auto'>
        <Typography variant='h2' component={'h1'}>UserCrud</Typography>
        <Stack spacing={1} direction={'row'}>
            <Button variant='outlined' onClick={loadData}>Refresh</Button>
            <Button variant='outlined' onClick={handleNew}>New</Button>
            <Button variant='outlined' onClick={handleUpdate}>Update</Button>
            <Button variant='outlined' onClick={handleDelete}>Delete</Button>
        </Stack>
        <UserContext.Provider value={[state, dispatch]}>
        {state.error || ''}
        {state.loading ? 'loading...' : <UserTable/>}
        <UserForm open={showForm} setShowForm={setShowForm} handleFormSubmit={handleFormSubmit} formData={formData} setFormData={setFormData}/>
        </UserContext.Provider>
    </Container>
  )
}

const UserTable = () => {

    const [state, dispatch] = React.useContext(UserContext);
    const selectedItem = state.selectedItem;
    const data = state.data;

    return <TableContainer component={Paper} sx={{marginTop:1}}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell variant='head'>Lastname</TableCell>
                        <TableCell variant='head'>Firstname</TableCell>
                        <TableCell variant='head'>Midname</TableCell>
                        <TableCell variant='head'>Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{data.map((user)=>{
                            //const className = ['crud-item'];
                            //if(selectedItem && selectedItem.id == user.id ) className.push('active')
                            return (<TableRow hover selected={selectedItem && selectedItem.id == user.id} key={user.id} onClick={()=>dispatch({type:'select', payload:{selected:user}})}>
                                    <TableCell variant='body'>{user.lastname}</TableCell>
                                    <TableCell variant='body'>{user.firstname}</TableCell>
                                    <TableCell variant='body'>{user.midname}</TableCell>
                                    <TableCell variant='body' ><Checkbox checked={user.active == 1} readOnly/></TableCell>
                                </TableRow>)
                        })}
                </TableBody>
            </Table>
        </TableContainer>
}

const UserForm = ({handleFormSubmit, formData, setFormData, setShowForm, open})=>{

   
    const handleInputChange = (e) =>{
        console.log(e.target.type);
        switch(e.target.type){
            case 'text':
            case 'hidden':
            case 'password':
                setFormData({...formData, [e.target.name]:e.target.value});
                break;
            case 'checkbox':
                setFormData({...formData, [e.target.name]:e.target.checked});
                break;
        }
    }

    return <Dialog className='crud-form' open={open} >
        <Box sx={{
            width:450,
            padding:2
        }}>
        <Typography variant='h3'>New User</Typography>
        <form  action="">
            <Stack spacing={1}>
                <input type='hidden' name='id' value={formData.id || ''} onChange={(e)=>handleInputChange(e)}/>
                <TextField required variant="outlined" type="text" name='lastname' label='Lastname' value={formData.lastname || ''} onChange={(e)=>handleInputChange(e)}/>
                <TextField required variant="outlined" type="text" name='firstname' label='Firstname' value={formData.firstname || ''} onChange={(e)=>handleInputChange(e)}/>
                <TextField required variant="outlined" type="text" name='midname' label='Midname' value={formData.midname || ''} onChange={(e)=>handleInputChange(e)}/>
                <TextField required variant="outlined" type="text" name='username' label='Username' value={formData.username || ''} onChange={(e)=>handleInputChange(e)}/>
                <TextField required variant="outlined" type="password" name='password' label='Password' value={formData.password || ''} onChange={(e)=>handleInputChange(e)}/>
                <FormControlLabel required control={<Checkbox checked={formData.active == 1} onChange={(e)=>handleInputChange(e)} name='active' />} label="Active"  />
                {/* <Box>
                    <Input type="checkbox" name='active' style={{width:'20px'}} label='Active' />
                </Box> */}
                <Stack spacing={1} direction='row' justifyContent='flex-end'>
                    <Button variant='contained' type="submit" onClick={handleFormSubmit}>Save</Button>
                    <Button variant='outlined' onClick={()=>setShowForm(false)}>Close</Button>
                </Stack>
            </Stack>
        </form>
        
        </Box>
        
    </Dialog>
}

export default UserCrud
