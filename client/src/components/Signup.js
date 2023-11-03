import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup({ onLogin }) {
  const history = useHistory();

  const initial = {
    username: "",
    password: "",
    email: "",
    passwordConfirmation: "",
  };
  const [user, setUser] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!user.username || !user.password || !user.email || user.password !== user.passwordConfirmation) {
      setIsLoading(false);
      let errorsObj = {};

      if (!user.username) {
        errorsObj.username = "Username is required";
      }
      if (!user.password) {
        errorsObj.password = "Password is required";
      }
      if (!user.email) {
        errorsObj.email = "Email is required";
      }
      if (user.password !== user.passwordConfirmation) {
        errorsObj.passwordConfirmation = "Passwords do not match";
      }

      setErrors(errorsObj);
    } else {
      fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            response.json().then((userData) => {
              onLogin(userData);
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

    // Clear the error message when the input changes
    setErrors({
      ...errors,
      [name]: "",
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
            placeholder="username"
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{errors.username}</div>
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
          ></input>
          <div style={{ color: "red" }}>{errors.password}</div>
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
          <div style={{ color: "red" }}>{errors.passwordConfirmation}</div>
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
          <div style={{ color: "red" }}>{errors.email}</div>
        </div>
        <input type="submit" value={isLoading ? "Loading..." : "Sign up"}></input>
      </form>
    </div>
  );
}

export default Signup;