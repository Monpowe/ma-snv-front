import {useState, useEffect} from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material"
import {
    ChevronLeft,
    PersonOutlined,
    CategoryOutlined,
    SettingsOutlined,
    DashboardOutlined,
    PointOfSaleOutlined,
    Inventory2Outlined,
    TrendingUpOutlined
} from "@mui/icons-material"
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'
import { useTheme } from '@emotion/react'

const navItems = [
    {text:"Dashboard", icon: <DashboardOutlined />},
    {text:"Transaction", icon:<PointOfSaleOutlined/>},
    {text:"Products", icon: <CategoryOutlined />},
    {text:"Items", icon: <Inventory2Outlined />},
    {text:"Reports", icon: <TrendingUpOutlined />},
    {text:"Users", icon: <PersonOutlined />},
    {text:"Settings", icon: <SettingsOutlined />}
]

const Sidebar = ({
    drawerWidth, 
    isSidebarOpen, 
    setIsSidebarOpen, 
    isNonMobile
})=>{

    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();


    useEffect(()=>{
        setActive(pathname.substring(1));
    }, [pathname])

    return <Box 
        width={ isSidebarOpen ? drawerWidth : 0} 
        sx={{transition:"width ease-in-out .2s"}}>
        <Drawer 
            transitionDuration={200}
            open={isSidebarOpen}
            variant="persistent"
            sx={{
                width:drawerWidth,
                "& .MuiDrawer-paper":{
                    width:drawerWidth,
                    color:theme.palette.primary.dark,
                    boxSizing:'border-box',
                    borderWidth: isNonMobile ? "2px" : 0,
                }
            }}
            anchor="left"
        >   
        <Box width="100%">
            <FlexBetween style={{height:'60px', marginBottom:'20px'}}>
                <Box textAlign="center" width="100%">
                    <Typography textAlign="center" variant="h3">Dev</Typography>
                </Box>
                {
                isNonMobile ||
                <IconButton onClick={()=>setIsSidebarOpen(false)}>
                        <ChevronLeft/>
                  </IconButton>
                }
            </FlexBetween>
            <List>
                {
                    navItems.map(({text, icon})=>{
                        const lcText = text.toLowerCase();
                        return <ListItem key={text} 
                            sx={{
                                background: active == lcText ? theme.palette.primary.light : 'transparent',
        
                            }}
                            disablePadding>
                            <ListItemButton
                            
                            onClick={()=>{
                                navigate(`/${lcText}`);
                                setActive(lcText)
                                ;
                            }}>
                                <ListItemIcon sx={{color: active == lcText ? 'white' : theme.palette.primary.main}}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText sx={{color: active == lcText ? 'white' : theme.palette.primary.main}}>
                                    {text}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    })
                }
            </List>
        </Box>
        </Drawer>
    </Box>
}

export default Sidebar