import axios from "axios";
import { useState } from "react";
import "./Post.css";

const Post = (props) => {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);

    const [doesLike, setDoesLike] = useState(props.post.likes.filter((like) => like.username === props.user?.username).length !== 0);

    const deletePost = (id) => {
        axios
            .post("https://akademia108.pl/api/social-app/post/delete", {
                post_id: id,
            }).then((res) => {
                console.log(res.data);
                props.setPosts((posts) => {
                    return posts.filter((post) => post.id !== res.data.post_id)
                })
            }).catch(error => console.error(error));
    }

    const likePost = (id, isLiked) => {
        axios
            .post("https://akademia108.pl/api/social-app/post/" + (isLiked ? "dislike" : "like"), {
                post_id: id
            })
            .then(() => {
                setLikesCount(likesCount + (isLiked ? -1 : 1));
                setDoesLike(!doesLike);
            })
            .catch(error => console.error(error));
    }

    const unfollow = (id) => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/disfollow", {
                leader_id: id,
            })
            .then(() => {
                props.getLatestPosts();
            })
            .catch(error => console.error(error));
    }


    return (
        <div className="post">
            <div className="avatar"><img src={props.post.user.avatar_url} alt={props.post.user.username} /></div>
            <div className="postData">
                <div className="postMeta">
                    <div className="name">{props.post.user.username}</div>
                    <div className="date">{props.post.created_at.substring(0, 10)}</div>
                </div>
                <div className="content">{props.post.content}</div>
                <div className="likes">
                    {props.user && (props.user?.username === props.post.user.username ? <button type="submit" onClick={() => { deletePost(props.post.id) }} className="btn delete">Delete</button> : <button className="btn delete" onClick={()=>unfollow(props.post.user.id)}>Unfollow</button>)}
                    {props.user && <button type="submit" onClick={() => { likePost(props.post.id, doesLike) }} className="btn like">{doesLike ? "Dislike" : "Like"}</button>}
                    <p>{likesCount}</p>
                </div>
            </div>
        </div>
    );
}

export default Post;