import React, { useEffect, useState, useContext } from "react"
import CommentCard from "./CommentCard"
import { UserContext } from "../context/Context"
import "../css/PostCard.css"

function PostCard({caption, content, comments, id, likes, userPosts, removePost}) {
    const {user, setUser} = useContext(UserContext)
    const [like, setLike] = useState(false)
    const [likeObj, setLikeObj] = useState({})
    const [totalLikes, setTotalLikes] = useState(0)

    const [comments2, setComments] = useState([])
    const [commenting, setCommenting] = useState(false)
    const [createComment, setCreateComment] = useState("")

    const [editPost, setEditPost] = useState(false)
    const [editCaption, setEditCaption] = useState("")

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
        setEditCaption(caption)
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
            setCreateComment("")
            setCommenting(false)
        })
    }

    function handleClickCancel() {
        setCommenting(false)
    }

    function handleClickComment() {
        setCommenting(true)
    }

    function handleClickEditPost() {
        setEditPost(true)
    }

    function handleChangeCaption(e) {
        setEditCaption(e.target.value)
        console.log(editCaption)
    }

    function handleSubmitCaption(e) {
        e.preventDefault()

        fetch(`/posts/${id}`, {
            method : "PATCH",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({caption : editCaption})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setEditPost(false)
        })
    }

    function handleClickDeletePost() {
        fetch(`/posts/${id}`, {
            method : "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            removePost(id)
        })
    }

    console.log(userPosts)
    console.log(caption)

    return <div className="post-card-container">
        <div className="username-image-container">
            <img className="profile-image" src={userPosts[0].user.image_url} alt="Profile Image"></img>
            <h2>{userPosts[0].user.username}</h2>
        </div>
        <img className="post-image" src={content}></img>
        <h2>{totalLikes} Likes</h2>
        <button onClick={handleLike}>{like ? "Unlike" : "Like"}</button>
        {userPosts[0].user_id == user.id ? <button onClick={handleClickEditPost}>Edit</button> : ""}
        {userPosts[0].user_id == user.id ? <button onClick={handleClickDeletePost}>Delete</button> : ""}
        {editPost ? <form onSubmit={handleSubmitCaption}>
            <input type="text" placeholder="caption" value={editCaption} onChange={handleChangeCaption}></input>
            <input type="submit" value="confirm"></input>
        </form> : <h3 className="caption">{userPosts[0].user.username} : {editCaption}</h3>}
        {commenting ?
        <form onSubmit={handleSubmitCreateComment}>
            <input placeholder="Comment..." name="create-comment" type="text" value={createComment} onChange={handleChangeCreateComment}></input>
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