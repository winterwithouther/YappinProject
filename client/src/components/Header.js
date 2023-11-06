import React, { useState, useContext } from "react"
import { UserContext } from "../context/Context";
import { Link } from "react-router-dom"

function Header({onLogin}) {
    const user = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    function handleLogout() {
        setIsLoading(true)
        fetch("/logout", {
            method : "DELETE"
        })
        .then((r) => {
            setIsLoading(false)
            if (r.ok) {
                onLogin(null)
            }
        })
    }

    function handleClick() {
        fetch(`/users/${user.id}`)
        .then(response => response.json())
        .then(userData => {
            onLogin(userData)
        })
    }
    
    return <div>
        <Link to="/">
            Home
        </Link>
        <Link to="/form">
            Post
        </Link>
        <Link to="/messages">
            Messages
        </Link>
        <Link to="/login">
            Login
        </Link>
        <Link to="/signup">
            Sign up
        </Link>
        <Link to="/profile" onClick={handleClick}>
            Profile
        </Link>
        <button onClick={handleLogout}>
            {isLoading ? "Loading..." : "Logout"}
        </button>
    </div>
}

export default Header