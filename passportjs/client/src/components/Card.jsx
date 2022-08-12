import React from "react";
import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <div className="card">
      <Link className="link" to={`/post/${post.id}`}>
        <h1 className="title">{post.title}</h1>
        <img src={post.img} alt="" className="img" />
        <p className="desc">{post.desc}</p>
        <button className="cardButton">READ MORE</button>
      </Link>
    </div>
  );
};

export default Card;
