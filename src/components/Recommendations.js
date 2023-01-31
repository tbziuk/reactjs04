import axios from "axios";
import { useEffect, useState } from "react";
import "./Recommendations.css";

const Recommendations = (props) => {

    const [recommend, setRecommend] = useState([]);

    const getRecommendations = () => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/recommendations")
            .then(res => {
                setRecommend(res.data);
            })
            .catch(error=>console.error(error));
    }

    const follow = (id) => {

        axios
            .post("https://akademia108.pl/api/social-app/follows/follow", {
                leader_id: id,
            })
            .then(()=>{
                props.getLatestPosts();
            })
            .catch(error=>console.error(error));
    }

    useEffect(() => {
        getRecommendations();
    }, [props.posts])

    return (<div className="recommendations">
        {recommend.map(recommendation => {
            return (
                <div className="recommendation" key={recommendation.id}>
                    <img src={recommendation.avatar_url} alt={recommendation.username} />
                    <h3>{recommendation.username}</h3>
                    <button className="btn" onClick={()=>{follow(recommendation.id)}}>Follow</button>
                </div>
            )
        })}
    </div>)
}

export default Recommendations;