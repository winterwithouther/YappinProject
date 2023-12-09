import React, { useState, useContext } from "react";
import { UserContext } from "../context/Context";
import { useHistory } from "react-router-dom";
import "../css/Login.css"

function Login() {
  const history = useHistory();
  const {setUser} = useContext(UserContext)

  const initial = {
    username: "",
    password: ""
  }

  const [testUser, setTestUser] = useState(initial)
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Perform validation before submitting
    if (testUser.username === '' || testUser.password === '') {
      setErrors({
        username: testUser.username === '' ? 'Username is required' : '',
        password: testUser.password === '' ? 'Password is required' : '',
      });
      setIsLoading(false);
    } else {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testUser),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            response.json().then((userData) => {
            //   onLogin(user);
                setUser(userData)
                history.push("/");
            });
          }
        });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setTestUser({
      ...testUser,
      [name]: value,
    });

    // Reset the error for the field that is being changed
    setErrors({
      ...errors,
      [name]: '',
    });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        <div>
          <label>Username</label>
          <input id="username-input"
            type="text"
            name="username"
            autoComplete="off"
            value={testUser.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <div style={{ color: 'red' }}>{errors.username}</div>
        </div>
        <div>
          <label>Password</label>
          <input id="password-input"
            type="password"
            name="password"
            value={testUser.password}
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Enter password"
          />
          <div style={{ color: 'red' }}>{errors.password}</div>
        </div>
        <input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </form>
    </div>
  );
}

export default Login;