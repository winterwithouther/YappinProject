import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/Context";

function Signup({ onLogin }) {
  const history = useHistory();
  const user = useContext(UserContext)

  const initial = {
    username: "",
    password: "",
    email: "",
    passwordConfirmation: "",
  };
  const [testUser, setTestUser] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!testUser.username || !testUser.password || !testUser.email || testUser.password !== testUser.passwordConfirmation) {
      setIsLoading(false);
      let errorsObj = {};

      if (!testUser.username) {
        errorsObj.username = "Username is required";
      }
      if (!testUser.password) {
        errorsObj.password = "Password is required";
      }
      if (!testUser.email) {
        errorsObj.email = "Email is required";
      }
      if (testUser.password !== testUser.passwordConfirmation) {
        errorsObj.passwordConfirmation = "Passwords do not match";
      }

      setErrors(errorsObj);
    } else {
      fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testUser),
      })
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            response.json().then((userData) => {
              onLogin(userData)
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
            value={testUser.username}
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
            value={testUser.password}
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
            value={testUser.passwordConfirmation}
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
            value={testUser.email}
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