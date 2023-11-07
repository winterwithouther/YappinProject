import React, { useState, useContext } from "react"
import { UserContext } from "../context/Context";
import { Link } from "react-router-dom"
import "../css/Header.css"

function Header() {
    const {user, setUser} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    function handleLogout() {
        setIsLoading(true)
        fetch("/logout", {
            method : "DELETE"
        })
        .then((r) => {
            setIsLoading(false)
            if (r.ok) {
                setUser(null)
            }
        })
    }

    function handleClick() {
        fetch(`/users/${user.id}`)
        .then(response => response.json())
        .then(userData => {
            setUser(userData)
        })
    }
    
    return <div className="header">
        <Link id="home-link" className="link" to="/">
            Home
        </Link>
        {user ? <Link id="post-link" className="link" to="/form">
            Post
        </Link> : <></>}
        {user ? <Link id="messages-link" className="link" to="/messages">
            Messages
        </Link> : <></>}
        {user ? <></> : <Link id="login-link" className="link" to="/login">
            Login
        </Link>}
        {user ? <></> : <Link id="signup-link" className="link" to="/signup">
            Sign up
        </Link>}
        {user ? <Link id="profile-link" className="link" to="/profile" onClick={handleClick}>
            Profile
        </Link> : <></>}
        {user ? <button onClick={handleLogout}>
            {isLoading ? "Loading..." : "Logout"}
        </button> : <></>}
    </div>
}

export default Header