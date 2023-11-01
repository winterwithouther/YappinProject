import React, { useState } from "react"

function CommentCard({content, id, user, commentUser, commentRemoved, commentEdited}) {
    const [editComment, setEditComment] = useState(false)
    const [comment, setComment] = useState(content)

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
        console.log(comment)
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
            console.log(data)
            commentEdited(id, data)
            setEditComment(false)
        })
    }

    function handleCancelEdit() {
        setEditComment(false)
    }

    if (editComment) {
        return <div>
            <form onSubmit={handleSubmitEditComment}>
                <input type="text" name="comment" value={comment} onChange={handleChangeEditComment}></input>
                <input type="submit" value="submit"></input>
                <button onClick={handleCancelEdit}>Cancel</button>
            </form>
        </div>
    }

    return <div>
        <h5>{commentUser.username} : {content}</h5>
        {user.id == commentUser.id ? 
        <div>
        <button onClick={handleEditComment}>Edit</button>
        <button onClick={handleDeleteComment}>Delete</button>
        </div> : ""}
    </div>
}

export default CommentCard