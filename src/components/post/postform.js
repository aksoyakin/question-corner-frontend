import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import {useState} from "react";
import {InputAdornment, OutlinedInput} from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const StyledAvatarLink = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',
});

function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const[text, setText] = useState("")
    const[title, setTitle] = useState("")
    const[isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/posts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    }

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();

    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (

        <div>
            <Snackbar
                open={isSent}
                autoHideDuration={1200}
                onClose={handleClose}
                message="Post sent successfully."
                action={action}
            />

            <Card sx={{width: 800, textAlign: "left", margin: 2}}>
                <CardHeader
                    avatar={
                        <StyledAvatarLink to={{pathname: '/users/' + userId}}>
                            <Avatar sx={{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF2 90%)'}}
                                    aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>

                        </StyledAvatarLink>
                    }

                    title={
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{maxLength: 25}}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}
                        >

                        </OutlinedInput>}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                multiline
                                placeholder="Text"
                                inputProps={{maxLength: 250}}
                                fullWidth
                                value={text}
                                onChange={(i) => handleText(i.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            style={{
                                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF2 90%)',
                                                color: 'white'
                                            }}
                                            onClick={handleSubmit}
                                        >Post</Button>
                                    </InputAdornment>
                                }>

                            </OutlinedInput>}
                    </Typography>
                </CardContent>
            </Card>
        </div>


    );
}

export default PostForm;