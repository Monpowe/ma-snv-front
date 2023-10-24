import React from 'react'
import { CrudContext } from './Crud';
import useToggle from '../hooks/useToggle';

function CrudItem({item,id, handleClick}) {

  const {selected, setSelected} = React.useContext(CrudContext);
  const [toggleVal, setToggle] = useToggle(true);

  return (
    <div className={`crud-item`} style={{backgroundColor:selected && selected.id == id ? 'gray':'white'}} onClick={()=>{handleClick(id)}}>
        <h4>{`${item.lname}, ${item.fname} ${item.mname}`}</h4>
        <span style={{fontSize:'15px'}}>{item.bdate}</span>
        <button style={{backgroundColor:toggleVal ? 'blue' : 'red'}} onClick={()=>setToggle()}>Toggle</button>
    </div>

  )
}

export default CrudItem