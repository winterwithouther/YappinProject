import React, {useState, useContext} from "react"
import { UserContext } from "../context/Context"
import { useHistory } from "react-router-dom"

function PostForm({addPost}) {
    const history = useHistory()
    const user = useContext(UserContext)

    const initial = {content : "", caption : ""}
    const [formPost, setFormPost] = useState(initial)

    function handleChange(e) {
        const {name, value} = e.target

        setFormPost({
            ...formPost,
            [name] : value
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        fetch("/posts", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(formPost)
        })
        .then(response => response.json())
        .then(postData => {
            console.log("Created Post")
            fetch("/userposts", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({user_id : user.id, post_id : postData.id})
            })
            .then(response => response.json())
            .then(userPostData => {
                console.log("Created UserPost")
                fetch(`/posts/${postData.id}`)
                .then(response => response.json())
                .then(updatedPostData => {
                    addPost(updatedPostData)
                    setFormPost(initial)
                    history.push("/")
                })
            })
        })
    }
    
    return <div>
        <form onSubmit={handleSubmit}>
            <label>Image</label>
            <input type="text" name="content" value={formPost.content} placeholder="image..." onChange={handleChange}></input>
            <label>Caption</label>
            <input type="text" name="caption" value={formPost.caption} placeholder="caption..." onChange={handleChange}></input>
            <input type="submit" value="post"></input>
        </form>
    </div>
}

export default PostForm