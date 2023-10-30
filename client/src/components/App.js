import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home"
import Header from "./Header"
import Login from "./Login"
import Messages from "./Messages"
import PostForm from "./PostForm";
import Profile from "./Profile";
import Signup from "./Signup";

function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  return <div>
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Signup/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Route exact path="/form">
          <PostForm/>
        </Route>
        <Route exact path="/messages">
          <Messages/>
        </Route>
      </Switch>
    </Router>
  </div>;
}

export default App;
