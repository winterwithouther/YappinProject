import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../context/Context"
import { useHistory } from "react-router-dom"
import PostList from "./PostList"

function Home({posts, removePost}) {
    const history = useHistory()
    const user = useContext(UserContext)

    if (user) {
        return <div>
            <h1>Welcome {user.username}</h1>
            <PostList posts={posts} user={user} removePost={removePost}/>
        </div>
    }

    // history.push("/signup")
    return <div>
        Hi
    </div>
}

export default Home