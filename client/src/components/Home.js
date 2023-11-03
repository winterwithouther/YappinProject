import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import PostList from "./PostList"

function Home({user, posts, removePost}) {
    const history = useHistory()

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