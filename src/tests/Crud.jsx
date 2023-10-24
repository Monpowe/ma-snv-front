import React from 'react'
import CrudForm from './CrudForm'
import CrudItem from './CrudItem';
import './crud.css';
import useArray from '../hooks/useArray';


const items = [
    {lname:'Rensal', fname:'Michael', mname:'Monino', bdate:'1998-04-26' },
    {lname:'Santos', fname:'Kim', mname:'khan', bdate:'1998-03-26' },
    {lname:'Asuncion', fname:'Jerry', mname:'Su', bdate:'1994-05-26' },
    {lname:'Rama', fname:'Caren', mname:'Sy', bdate:'1998-06-26' },
    {lname:'Delos Santos', fname:'Jerimiah', mname:'Carlos', bdate:'1994-08-26' },
];

export const CrudContext = React.createContext();

const Crud = () => {

    const [selected, setSelected] = React.useState(null);
    const [arrVal, arrFunc] = useArray([1,2,35,85,100]);

    const handleItemClick = (id)=>{
        console.log({...items[id], id});
        setSelected({...items[id], id});

    }

  return (
    <div className='crud'>
        <CrudContext.Provider value={{selected, setSelected}}>
            <div>{arrVal.join(', ')}</div>
            <button onClick={()=>arrFunc.push(selected.id || 0)}>Push</button>
            <button onClick={()=>arrFunc.remove(selected.id || 0)}>Remove</button>
            <button onClick={()=>arrFunc.empty()}>Empty</button>
            <h2>Crud</h2>
            {items.map((item, i)=>{
                return <CrudItem key={i} id={i} item={item} handleClick={handleItemClick} />
            })}
            <CrudForm />
        </CrudContext.Provider>
    </div>
  )
}

export default Crud