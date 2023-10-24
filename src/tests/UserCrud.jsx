import React from 'react'
import './crud.css';

const hostname= "http://localhost:3001/api/users/";


const UserCrud = () => {

    const [formData, setFormData] = React.useState({});
    const [data, setData] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [err, setErr] = React.useState(null);
    const [loading, setLoading] = React.useState(false);


    const handleDelete = ()=>{

        if(!selectedItem) return alert('Please select a record');

        deleteData(selectedItem.id);
       
    }

    const deleteData = async (id)=>{

        try {

            const res = await fetch(hostname + id, {method:'DELETE'});
            const dataId = await res.json();
            setData(data.filter((i)=>i.id != dataId));
          
        } catch (error) {
            setErr(err.message);
        }finally{
            setSelectedItem(null);
        }
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        saveData(formData);

    }

    const saveData = async(body)=>{
            try{
                const res = await fetch(hostname, {method: body.id ? 'PUT' : 'POST', headers: {"Content-Type": "application/json",},body: JSON.stringify(body)});
                const d = await res.json();

                if(body.id){
                    const mapData = data.map((i)=>{
                        return i.id == d[0].id ? d[0] : i;
                    })
                    
                    setData(mapData)
                }else{
                    setData([...data, d[0]]);
                }
                
            
            }catch(err){
                setErr(err.message);
            }finally{
                setShowForm(false);
            }
    }

    const loadData = async()=>{

        setData([]);
        setSelectedItem(null);
        setLoading(true);
        setErr(false);
        try{
            const res = await fetch(hostname);
            const data = await res.json();
            setData(data);
        }catch(err){
            setErr(err.message);
        }finally{
            setLoading(false);
        }
    }

    const handleUpdate = ()=>{
        if(!selectedItem) alert('Please select a record');

        setFormData(selectedItem);
        setShowForm(true);

    }

    const handleNew=()=>{
        setSelectedItem(null)
        setFormData({});
        setShowForm(true);
    }

    React.useEffect(()=>{
    
         loadData();

    },[]);

  return (
    <div className='crud'>
        <h2>UserCrud</h2>
        <div>
            <button onClick={loadData}>Refresh</button>
            <button onClick={handleNew}>New</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        {err || ''}
        {loading ? 'loading...' : <UserTable setSelectedItem={setSelectedItem} selectedItem={selectedItem} data={data}/>}
        {showForm && <UserForm setShowForm={setShowForm} handleFormSubmit={handleFormSubmit} formData={formData} setFormData={setFormData}/>}
    </div>
  )
}

const UserTable = ({setSelectedItem, selectedItem, data}) => {

    return <div>
            <table>
                <thead>
                    <tr>
                        <th>Lastname</th><th>Firstname</th><th>Midname</th><th>Active</th>
                    </tr>
                </thead>
                <tbody>{data.map((user)=>{
                            const className = ['crud-item'];
                            if(selectedItem && selectedItem.id == user.id ) className.push('active')
                            return (<tr key={user.id} className={className.join(' ')} onClick={()=>setSelectedItem(user)}>
                                    <td>{user.lastname}</td><td>{user.firstname}</td><td>{user.midname}</td><td>{user.active}</td>
                                </tr>)
                        })}
                </tbody>
            </table>
        </div>
}

const UserForm = ({handleFormSubmit, formData, setFormData, setShowForm})=>{

   
    const handleInputChange = (e) =>{
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

    return <div className='crud-form' >
        <div className="form-container">
        <h3>New User</h3>
        <form  action="">
            <input type="idden" name='id' value={formData.id || ''} onChange={(e)=>handleInputChange(e)}/>
            <input type="text" name='lastname' placeholder='Lastname' value={formData.lastname || ''} onChange={(e)=>handleInputChange(e)}/>
            <input type="text" name='firstname' placeholder='Firstname' value={formData.firstname || ''} onChange={(e)=>handleInputChange(e)}/>
            <input type="text" name='midname' placeholder='Midname' value={formData.midname || ''} onChange={(e)=>handleInputChange(e)}/>
            <input type="text" name='username' placeholder='Username' value={formData.username || ''} onChange={(e)=>handleInputChange(e)}/>
            <input type="password" name='password' placeholder='Password' value={formData.password || ''} onChange={(e)=>handleInputChange(e)}/>
            <div>
                <input type="checkbox" name='active' style={{width:'20px'}} checked={formData.active || false} onChange={(e)=>handleInputChange(e)}/><span>Active</span>
            </div>
            <div className='buttons'>
                <button type="submit" onClick={handleFormSubmit}>Save</button>
                <button onClick={()=>setShowForm(false)}>Close</button>
            </div>
           
           
        </form>
        
        </div>
        
    </div>
}


export default UserCrud;
