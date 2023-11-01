import React, { useState } from "react"
import { useHistory } from "react-router-dom"

function Login({onLogin}) {

    const history = useHistory()

    const initial = {
        username : "",
        password : "",
    }

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(initial)

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        fetch("/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((response) => {
            setIsLoading(false)
            if (response.ok) {
                response.json().then((user) => {
                    onLogin(user)
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
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    autoComplete="current-password"
                    onChange={handleChange}
                ></input>
            </div>
            <input type="submit" value={isLoading ? "Loading..." : "Login"}></input>
        </form>
    </div>
}

export default Login