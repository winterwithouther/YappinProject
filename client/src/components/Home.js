import React, { useContext } from "react"
import { UserContext } from "../context/Context"
import PostList from "./PostList"
import "../css/Home.css"

function Home({posts, removePost}) {
    const {user} = useContext(UserContext)

    if (user) {
        return <div>
            <h1>Welcome {user.username}</h1>
            <PostList posts={posts} user={user} removePost={removePost}/>
        </div>
    }

    // history.push("/signup")
    return <div className="container">
        <h1>YAPPIN 💬</h1>
        <div className="connect-section">
            <h2>CONNECT AND START YAPPING</h2>
            <h3>BECOME A YAPPER TODAY</h3>
        </div>
        <div className="about">
            <h3>ABOUT US</h3>
            <p>Yappin is the ultimate social networking app designed to connect you with your community and beyond. 🌍 Share your thoughts, stories, and experiences through posts and photos. Whether you're an influencer, a budding entrepreneur, or just want to stay connected with friends, Yappin is your go-to platform.</p>
        </div>
    </div>
}

export default Home