import React, { useEffect, useState } from "react"
import CommentCard from "./CommentCard"

function PostCard({caption, content, comments, user, id, likes}) {
    const [like, setLike] = useState(false)
    const [likeObj, setLikeObj] = useState({})
    const [totalLikes, setTotalLikes] = useState(0)
    const [comments2, setComments] = useState([])

    const commentsDisplay = comments2.map(comment => {
        return <CommentCard
                key={comment.id}
                content={comment.content}
                user={comment.user}
                />
    })

    useEffect(() => {
        likes.map(like => {
            if (like.user_id === user.id) {
                setLikeObj(like)
                setLike(true)
            }
        })
        setTotalLikes(Object.keys(likes).length)
        setComments(comments)
    }, [])

    function handleLike() {
        if (like) {
            fetch(`/likes/${likeObj.id}`, {
                method : "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                setLike(false)
                setLikeObj({})
                setTotalLikes(prevTotalLikes => prevTotalLikes - 1)
            })
        } else {
            fetch("/likes", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify({user_id : user.id, post_id : id})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLikeObj(data)
                setLike(true)
                setTotalLikes(prevTotalLikes => prevTotalLikes + 1)
            })
        }
    }

    return <div>
        <img src={content}></img>
        <h2>Likes : {totalLikes}</h2>
        <button onClick={handleLike}>{like ? "Unlike" : "Like"}</button>
        <h4>USERNAME : {caption}</h4>
        <div>
            <h4>Comments:</h4>
            {commentsDisplay}
        </div>
    </div>
}

export default PostCard