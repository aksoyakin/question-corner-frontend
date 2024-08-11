import React from "react";
import {Link} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from "@mui/material/styles";

const StyledHomeTypography = styled(Typography)({
   flexGrow: 1,
   textAlign: "left"
});

const StyledHome = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
});
const StyledUser = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
});
function Navbar() {


    let userId = 5;

    return (
        <Box sx={{ flexGrow: 1 }}>
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <StyledHomeTypography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <StyledHome  to="/">Home</StyledHome>
                    </StyledHomeTypography>
                    <Typography variant="h6" >
                        <StyledUser to={{pathname: '/users/' + userId}}>User</StyledUser>
                    </Typography>
                    <Button color="inherit">Login</Button>


                </Toolbar>
            </AppBar>
        </div>
        </Box>
    );
}

export default Navbar;