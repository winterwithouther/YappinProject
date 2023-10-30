import React, { useState } from "react"

function Signup() {
    const initial = {
        username : "",
        password : "",
        email : "",
        passwordConfirmation : "",
        image_url : ""
    }
    const [user, setUser] = useState(initial)

    return <div>
        <form>
            <formfield>
                <label>Username</label>
                <input
                    type="text"
                    autoComplete="off"
                ></input>
            </formfield>
        </form>
    </div>
}

export default Signup