import { useState } from 'react'
// import Test from './tests/Test.jsx';
// import TestMemo from './tests/TestMemo.jsx';
// import Crud from './tests/Crud.jsx';
import UserCrud from './tests/UserCrud2.jsx'
import  Dashboard from './scenes/dashboard/index.jsx';
import Login from './Login.jsx';
import Styled from './tests/Styled.jsx';
import { CssBaseline, ThemeProvider, colors, createTheme} from '@mui/material';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './scenes/Layout.jsx';
import PageNotFound from './PageNotFound.jsx';

const theme = createTheme({
  palette:{
    primary:{
      main:colors.blue[500],
      contrastText:'#fff'
    },
    secondary:{
      main:colors.blue[300]
    },
    error:{
      main:colors.red[900]
    }
  },
  shape:{
    borderRadius:2
  },
  typography:{
    fontSize:14,
    h1:{
      fontSize:40,
      fontWeight:500
    },
    h2:{
      fontSize:35,
      fontWeight:500
    },
    h3:{
      fontSize:30,
      fontWeight:500
    },
    h4:{
      fontSize:25,
      fontWeight:500
    }
  },
  components:{
    MuiTableCell:{
      styleOverrides:{
        
      }
    }
  }
});


const isLogin = false;

function App() {

  return (

    <div className='app'>
        {
          isLogin 
          ? <HashRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <Routes>
                <Route element={<Layout />}>
                  <Route path='/' element={<Navigate to="/dashboard" replace/>} />
                  <Route path="/dashboard" element={<Dashboard/>} />
                  <Route path="/users" element={<UserCrud/>} />
                  <Route path="*" element={<PageNotFound />} />
                </Route>
              </Routes>
          </ThemeProvider>
          </HashRouter>
          :<Login/>
        }
    </div>
  )
}

export default App
