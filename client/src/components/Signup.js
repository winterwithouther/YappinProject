import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

function Signup({onLogin}) {
    const history = useHistory()

    const initial = {
        username : "",
        password : "",
        email : "",
        passwordConfirmation : "",
    }
    const [user, setUser] = useState(initial)
    const [isLoading, setIsloading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setIsloading(true)

        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        .then((r) => {
            setIsloading(false)
            if (r.ok) {
                r.json().then((userData) => {
                    onLogin(userData)
                    history.push("/")
                })
            }
        })
    }

    function handleChange(e) {
        const {name, value} = e.target

        setUser({
            ...user,
            [name] : value
        })

        console.log(value)
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={user.username}
                    placeholder="username"
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={user.password}
                    placeholder="password"
                    onChange={handleChange}
                >
                </input>
            </div>
            <div>
                <label htmlFor="password">Password Confirmation</label>
                <input
                    type="password"
                    name="passwordConfirmation"
                    value={user.passwordConfirmation}
                    onChange={handleChange}
                    placeholder="password confirm"
                    autoComplete="current-password"
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="email"
                    onChange={handleChange}
                ></input>
            </div>
            <input type="submit" value={isLoading ? "Loading..." : "Sign up"}></input>
        </form>
    </div>
}

export default Signup