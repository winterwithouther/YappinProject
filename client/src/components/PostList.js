import React from "react"
import PostCard from "./PostCard"

function PostList({posts, user}) {

    const postsDisplay = posts.map((post) => {
        return <PostCard
            key={post.id}
            caption={post.caption}
            content={post.content}
            comments={post.comments}
            user={user}
            id={post.id}
            likes={post.likes}
        />
    })

    return <div>
        {postsDisplay}
    </div>
}

export default PostList