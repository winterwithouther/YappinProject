import React from "react"

function CommentCard({content, user}) {
    return <div>
        <h5>{user.username} : {content}</h5>
    </div>
}

export default CommentCard