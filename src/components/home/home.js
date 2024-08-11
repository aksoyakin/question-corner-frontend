import React, {useEffect, useState} from "react";
import Post from "../post/post";
import PostForm from "../post/postform";


function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList,setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [postList])

    if(error){
        return <div>Error !!!!</div>
    } else if(!isLoaded){
        return <div>Loading...</div>
    } else {
        return(
            <div style={{

                display:"flex",
                flexWrap:"wrap",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#f0f5ff",
            }} >
                <PostForm userId={1} userName={"akin"} refreshPosts={refreshPosts} ></PostForm>
                {postList.map(post => (
                    <Post
                        likes = {post.likes}
                        postId = {post.id}
                        userId={post.userId}
                        userName={post.userName}
                        title={post.title}
                        text={post.text}>
                    </Post>
                ))}
            </div>
        );
    }
}

export default Home;