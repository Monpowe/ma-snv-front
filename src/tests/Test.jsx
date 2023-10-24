import {useState, useLayoutEffect, useContext, useReducer, useRef, useEffect} from 'react';
import { UserContext } from '../main';
import { dialogClasses } from '@mui/material';



const listReducer = (state, action)=>{
    console.log(action);
    switch(action.type){
        case 'Add':
            state = [...state, action.payload.data];
            break;
        case 'Edit':
            console.log(state[action.payload.index]);
           // state[action.payload.index] = action.payload.data;
            const oldState = state;
            oldState[action.payload.index] = action.payload.data;
            state = [...oldState];
            break;
        case 'delete':
            state =state.filter((item, i)=>i != action.payload.index);
            break;
        default:
            break;
    }

    return state;
}


const Test = ({title, children}) =>{

 
    const user = useContext(UserContext);
    const [list, dispatchList] = useReducer(listReducer, ['Mango', 'Apple']); 
    const [selected, setSelected] = useState(null);
    const [counter, setCounter] = useState(0);
    const [item, setItem] = useState('');
    const titleRef = useRef();

    useLayoutEffect(()=>{
        const hInterval = setTimeout(()=>{
            titleRef.current.style.height += 3;
            console.log(titleRef.current.style.height);
        },1000)

        return ()=>clearInterval(hInterval); 
    }, [selected])

    const handleClick = (id)=>{
        setSelected(id)
        setItem(list[id]);
    }

    const handleKeyDown = (e)=>{

    
      if(e.key != 'Enter' || !item) return;

      const type = selected == null ? 'Add' : 'Edit';
    
      dispatchList({type, payload:{data:item, index:selected}})
      setItem('');
      if(type == 'Edit'){
        setSelected(null);
      }
    }

    return <div>
            <h1 ref={titleRef}>{title}</h1>
                <p>User: {user}</p>
                <p>Selected : {list[selected]}</p>
                {list.map((item, index)=><List desc={item} id={index} key={index} handleClick={handleClick}/>)}
                <button onClick={()=>{setSelected(null);setItem('')}}>New</button>
                <button onClick={()=>dispatchList({type:'delete', payload:{index:selected}})}>Delete</button>
                <input type="text" name="item" value={item} onChange={(e)=>setItem(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                {children}
            </div>
}


function List({desc,id,handleClick}){
    return <div onClick={(e)=>handleClick(id)}>
        <h2>{desc}</h2>
    </div>
}




export default Test