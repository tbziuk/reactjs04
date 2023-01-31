import axios from "axios";
import { useState } from "react";
import "./AddPost.css";

const AddPost = (props) => {

    const [newPost, setNewPost] = useState('');

    const postAddition = (e) => {
        e.preventDefault();

        if (!newPost) {
            return;
        } else {

            axios
                .post("https://akademia108.pl/api/social-app/post/add", {
                    content: newPost,
                })
                .then(res => {
                    console.log(res);
                    setNewPost('');
                    props.getPreviousPosts();
                })
                .catch(error => console.error(error));
        }
    }

    return (
        <div className="addPost">
            <form className="addPost" onSubmit={postAddition}>
                <textarea placeholder="Add post..." onChange={(e)=>{setNewPost(e.target.value)}} value={newPost}></textarea>
                <button type="submit" className="btn addPost">Add Post</button>
            </form>
        </div>
    );
}

export default AddPost;