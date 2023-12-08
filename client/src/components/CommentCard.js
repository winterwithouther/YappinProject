import React, { useState, useContext } from "react"
import { UserContext } from "../context/Context"
import "../css/Comment.css"

function CommentCard({content, id, commentUser, commentRemoved, commentEdited}) {

    const [editComment, setEditComment] = useState(false)
    const [comment, setComment] = useState(content)
    const {user} = useContext(UserContext)
    
    function handleDeleteComment() {
        fetch(`/comments/${id}`, {
            method : "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            commentRemoved(id)
        })
    }

    function handleEditComment() {
        setEditComment(true)
    }

    function handleChangeEditComment(e) {
        setComment(e.target.value)
    }

    function handleSubmitEditComment(e) {
        e.preventDefault()

        fetch(`/comments/${id}`, {
            method : "PATCH",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({content : comment})
        })
        .then(response => response.json())
        .then(data => {
            commentEdited(id, data)
            setEditComment(false)
        })
    }

    function handleCancelEdit() {
        setEditComment(false)
    }

    if (editComment) {
        return <div className="comment-card">
            <form onSubmit={handleSubmitEditComment}>
                <input type="text" name="comment" value={comment} onChange={handleChangeEditComment}></input>
                <input type="submit" value="submit"></input>
                <button onClick={handleCancelEdit}>Cancel</button>
            </form>
        </div>
    }

    return <div className="comment-card">
        <h5>{commentUser.username} : {content}</h5>
        {user.id === commentUser.id ? 
        <div className="button-group">
            <button onClick={handleEditComment}>Edit</button>
            <button onClick={handleDeleteComment}>Delete</button>
        </div> : ""}
    </div>
}

export default CommentCard