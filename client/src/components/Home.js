import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import PostList from "./PostList"

function Home({user}) {
    const history = useHistory()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("/posts")
        .then(response => response.json())
        .then(data => {
            setPosts(data)
        })
    }, [])

    console.log(posts)

    if (user) {
        return <div>
            <h1>Welcome {user.username}</h1>
            <PostList posts={posts} user={user}/>
        </div>
    }

    // history.push("/signup")
    return <div>
        Hi
    </div>
}

export default Home