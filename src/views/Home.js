import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
import "./Home.css";
import Recommendations from "../components/Recommendations";

const Home = (props) => {

    const [posts, setPosts] = useState([]);

    const getLatestPosts = () => {

        axios.post("https://akademia108.pl/api/social-app/post/latest")
            .then(res=>{
                console.log(res);
                setPosts(res.data);
            })
            .catch(error=>{
                console.error(error);
            });
    }

    const getNextPosts = () => {

        axios.post("https://akademia108.pl/api/social-app/post/older-then", { 
            date: posts[posts.length - 1].created_at})
            .then(res=>{
                console.log(res);
                setPosts(posts.concat(res.data));
            })
            .catch(error=>{
                console.error(error);
            });
    }

    const getPreviousPosts = () => {

        axios.post("https://akademia108.pl/api/social-app/post/newer-then", { 
            date: posts[0].created_at})
            .then(res=>{
                console.log(res);
                setPosts(res.data.concat(posts));
            })
            .catch(error=>{
                console.error(error);
            });
    }

    useEffect(()=>{
        getLatestPosts();
    }, [props.user])

    return (
        <div className="home">
            {props.user && <AddPost getPreviousPosts={getPreviousPosts}/>}
            {props.user && <Recommendations user={props.user} getLatestPosts={getLatestPosts} posts={posts} />}
            <div className="postList">
                {posts.map((post)=>{
                   return (
                    <Post user={props.user} post={post} key={post.id} setPosts={setPosts} getLatestPosts={getLatestPosts}/>
                   )
                })}
            </div>
            <button className="btn read-more" type="submit" onClick={getNextPosts}>Read more</button>
        </div>
    )
};

export default Home;