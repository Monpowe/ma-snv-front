import React from 'react'
import { useEffect } from 'react';
import { CrudContext } from './Crud';
import { buttonBaseClasses } from '@mui/material';

const CrudForm = () => {

    const [formData, setformData] = React.useState({});
    const {selected, setSelected} = React.useContext(CrudContext);

    useEffect(()=>{
        if(selected) setformData(selected);
    }, [selected])

    const handleChange = (e)=>{
        
        setformData({...formData, [e.target.name]:e.target.value});
        
    }

    const handleClose=(e)=>{
        e.preventDefault();

        setSelected(null);
    }


  return (
    
    <div className='crud-form' style={{display:selected != null ? 'block' : 'none'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>Item</h3>
            <a href="#" style={{textDecoration:'none', color:'gray', padding:'3px'}} onClick={(e)=>handleClose(e)}>x</a>
        </div>
        <form action="">
            <input type="text" name='lname' value={formData.lname} onChange={(e)=>handleChange(e)}/>
            <input type="text" name='fname' value={formData.fname} onChange={(e)=>handleChange(e)}/>
            <input type="text" name='mname' value={formData.mname} onChange={(e)=>handleChange(e)}/>
            <input type="date" name='bdate' value={formData.bdate} onChange={(e)=>handleChange(e)}/>
        </form>

    </div>
  )
}

export default CrudForm