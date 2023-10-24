import { Box, Typography, TextField, Stack, Button } from '@mui/material'
import React from 'react'


const hostname= "http://localhost:3001/api/users/";
const login = async (username, password)=>{
    return new Promise(async (response, reject)=>{
        try{
            const ret = await fetch(hostname+'login', {method:'POST',  headers: {"Content-Type": "application/json"},body:JSON.stringify({username, password})});
            const data = await ret.json();
            if(ret.ok) response(data);
            else throw new Error(data);
        }catch(err){
            reject(err.message);
        }
    })
}



const Login = () => {

    const [formData, setFormData] = React.useState({username:'', password:''});
    const [formError, setFormError] = React.useState({username:false, password:false});
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);


    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    const validateForm = ()=>{
        
        let isValid = true;

        for(let key in formData){
            if(!formData[key]) isValid = false;
        }
        setFormError((e)=>{return {...e, username:!formData.username}})
        setFormError((e)=>{return {...e, password:!formData.password}})

        return isValid;
    }

    const handleSubmit = (e)=>{

        e.preventDefault();
        if(loading) return alert('w8');
        setError(null);

        if(validateForm()){
            setLoading(true)
            login(formData.username, formData.password).then((res)=>{
                alert('success');
            }).catch((err)=>{
                setError(err);
            }).finally(()=>{
                setLoading(false)
            })

        }

    }

    


  return (
    <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Box style={{width:350, padding:10, shadow:'5px, 5px, 10px gray'}}>
            <Typography variant='h3' component='h1'>Login</Typography>
            <form action="">
            <Stack spacing={1} style={{margin:'10px 0px'}}>
                <TextField error={formError.username} label='Username' name='username' type='text' value={formData.username} onChange={(e)=>handleChange(e)}/>
                <TextField error={formError.password} label='Password' name='password' type='password' value={formData.password} onChange={(e)=>handleChange(e)}/>
            </Stack>
            <Stack>
                <Button type='submit' variant='contained' onClick={handleSubmit}>Login</Button>
            </Stack>
            </form>
            {error && <div>{error}</div>}
        </Box>
    </div>
  )
}

export default Login