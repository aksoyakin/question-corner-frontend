import React, {useEffect, useRef} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Container} from "@mui/material";
import Comment from "../comment/comment";
import CommentForm from "../comment/commentform";

const StyledAvatarLink = styled(Link)({
    textDecoration: 'none',
    boxShadow: 'none',
    color: 'white',

});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post(props){
    const {title, text, userId, userName, postId, likes} = props;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [commentList, setCommentList] = useState([]);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList)
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLike();
            setLikeCount(likeCount + 1)
        }
        else {
            deleteLike();
            setLikeCount(likeCount -1)
        }
    }

    const refreshComments = () => {
        fetch("/comments?postId="+postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
            }),
        })
            .then(res => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        console.log(likeId);
        fetch("/likes/"+likeId, {
            method: "DELETE",
        })
            .catch((err) => console.log(err))
    }


    useEffect(() => {
        if(isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList]);

    const checkLikes = () => {
        var likeControl = likes.find(like => like.userId === userId)
        if(likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }

    }
    useEffect(() => {
        checkLikes()
    },[])


    return(
        <Card sx={{ width: 800, textAlign:"left", margin: 2}}>
            <CardHeader
                avatar={
                    <StyledAvatarLink to={{pathname: '/users/' + userId}}>
                        <Avatar sx={{     background: 'linear-gradient(45deg, #2196F3 30%, #21CBF2 90%)', }} aria-label="recipe">
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </StyledAvatarLink>
                }
                title= {title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleLike}
                    aria-label="add to favorites">
                    <FavoriteIcon style={isLiked? {color: "red"} : null}  />
                </IconButton>
                {likeCount}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container>
                    {error? "error" :
                        isLoaded? commentList.map(comment => (
                            <Comment userId={1} userName={"USER"} text={comment.text} />
                        )) : "Loading"}

                    <CommentForm userId={1} userName={"USER"} postId={postId} ></CommentForm>
                </Container>
            </Collapse>
        </Card>
    )
}

export default Post;