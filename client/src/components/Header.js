import React from "react"
import { Link } from "react-router-dom"

function Header() {
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
        <Link to="/profile">
            Profile
        </Link>
    </div>
}

export default Header