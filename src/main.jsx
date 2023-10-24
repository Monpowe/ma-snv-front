import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { tokens } from './theme.js'


console.log(tokens('light'));

export const UserContext = createContext();

ReactDOM.createRoot(document.getElementById('root')).render(
      <UserContext.Provider value={'Michael Rensal'}>
        <App/>
      </UserContext.Provider>
)
