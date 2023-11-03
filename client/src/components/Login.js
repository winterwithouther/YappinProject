import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ onLogin }) {
  const history = useHistory();

  const initial = {
    username: "",
    password: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(initial);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Perform validation before submitting
    if (user.username === '' || user.password === '') {
      setErrors({
        username: user.username === '' ? 'Username is required' : '',
        password: user.password === '' ? 'Password is required' : '',
      });
      setIsLoading(false);
    } else {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            response.json().then((user) => {
              onLogin(user);
              history.push("/");
            });
          }
        });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    // Reset the error for the field that is being changed
    setErrors({
      ...errors,
      [name]: '',
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            autoComplete="off"
            value={user.username}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errors.username}</div>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            autoComplete="current-password"
            onChange={handleChange}
          />
          <div style={{ color: 'red' }}>{errors.password}</div>
        </div>
        <input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </form>
    </div>
  );
}

export default Login;
