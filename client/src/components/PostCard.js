import React, { useEffect, useState } from "react"
import CommentCard from "./CommentCard"

function PostCard({caption, content, comments, user, id, likes}) {
    const [like, setLike] = useState(false)
    const [likeObj, setLikeObj] = useState({})
    const [totalLikes, setTotalLikes] = useState(0)
    const [comments2, setComments] = useState([])
    const [commenting, setCommenting] = useState(false)
    const [createComment, setCreateComment] = useState("")

    function commentRemoved(id) {
        const newComments = comments2.filter((comment) => {
            return comment.id !== id
        })
        setComments(newComments)
    }

    function commentEdited(id, data) {
        const newComments = comments2.map(comment => {
            if (comment.id === id) {
                return data
            } else {
                return comment
            }
        })

        setComments(newComments)
    }

    const commentsDisplay = comments2.map(comment => {
        return <CommentCard
                key={comment.id}
                content={comment.content}
                commentUser={comment.user}
                user={user}
                id={comment.id}
                commentRemoved={commentRemoved}
                commentEdited={commentEdited}
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

    function handleChangeCreateComment(e) {
        setCreateComment(e.target.value)
    }

    function handleSubmitCreateComment(e) {
        e.preventDefault()
        fetch("/comments", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({content : createComment, post_id : id, user_id : user.id})
        })
        .then(response => response.json())
        .then(data => {
            setComments([...comments2, data])
            setCommenting(false)
            console.log(comments2)
        })
    }

    function handleClickCancel() {
        setCommenting(false)
    }

    function handleClickComment() {
        setCommenting(true)
    }

    return <div>
        <img src={content}></img>
        <h2>Likes : {totalLikes}</h2>
        <button onClick={handleLike}>{like ? "Unlike" : "Like"}</button>
        <h4>USERNAME : {caption}</h4>
        {commenting ? 
        <form onSubmit={handleSubmitCreateComment}>
            <input name="create-comment" type="text" value={createComment} onChange={handleChangeCreateComment}></input>
            <input type="submit" value="comment"></input>
            <button onClick={handleClickCancel}>cancel</button>
        </form> : <button onClick={handleClickComment}>Comment</button>}
        <div>
            <h4>Comments:</h4>
            {commentsDisplay}
        </div>
    </div>
}

export default PostCard