import React from "react";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";

const StyledAvatarLink = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
});

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent className="comment">
            <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{maxLength: 25}}
                fullWidth
                value = {text}
                startAdornment = {
                    <InputAdornment position="start">
                        <StyledAvatarLink to={{pathname: '/users/' + userId}}>
                            <Avatar sx={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF2 90%)'}}
                                    aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </StyledAvatarLink>
                    </InputAdornment>
                }
            >
            </OutlinedInput>
        </CardContent>

    )
}

export default Comment;