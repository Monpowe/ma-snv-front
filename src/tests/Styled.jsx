
import { Button, styled, Stack } from "@mui/material";

const StyledButton = styled(Button)({
    height:'80px',
    width:'200px',
    display:'block'
})

const Styled = ()=>{

    return <div>
        <h1>Styled</h1>
        <Stack direction={'row'} gap={1}>
            <StyledButton variant="contained">Contained Primary Button</StyledButton>
            <Button variant="contained" color="secondary">Secondary</Button>
            <Button variant="contained" color="success">Success</Button>
            <Button variant="contained" color="error">Error</Button>
            <Button variant="outlined">Outlined</Button>
        </Stack>
    </div>
}


export default Styled;