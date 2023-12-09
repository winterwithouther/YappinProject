import React, {useContext} from "react"
import PostCard from "./PostCard"

function PostList({posts, removePost}) {

    const postsDisplay = posts.map((post) => {
        return <PostCard
            key={post.id}
            caption={post.caption}
            content={post.content}
            comments={post.comments}
            id={post.id}
            likes={post.likes}
            userPosts={post.userposts}
            removePost={removePost}
        />
    })

    return <div>
        {postsDisplay}
    </div>
}

export default PostList