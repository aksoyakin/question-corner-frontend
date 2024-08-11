import React, {useState} from "react";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

const StyledAvatarLink = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
});

function CommentForm(props) {
    const { userId, userName, postId } = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    }

    const handleSubmit = () => {
       saveComment();
       setText("");

    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent className="comment">
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{maxLength: 250}}
                fullWidth
                onChange = {(i) => handleChange(i.target.value)}
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
                endAdornment={
                <InputAdornment position="end">
                    <Button
                        variant="contained"
                        style={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF2 90%)',
                            color: 'white'
                        }}
                        onClick={handleSubmit}
                    >Comment</Button>
                </InputAdornment>
                }
                value={text}
            >
            </OutlinedInput>
        </CardContent>

    )
}

export default CommentForm;