import React, { useEffect, useState, useContext } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home"
import Header from "./Header"
import Login from "./Login"
import Messages from "./Messages"
import PostForm from "./PostForm";
import Profile from "./Profile";
import Signup from "./Signup";
import { UserContext } from "../context/Context";

function App() {
  
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    // auto-login
    fetch("/checksession")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
    fetch("/posts")
    .then(response => response.json())
    .then(data => {
        setPosts(data)
    })
  }, [])

  function addPost(data) {
    setPosts([...posts, data])
  }

  function removePost(id) {
    const newPosts = posts.filter(post => {
      return post.id !== id
    })
    setPosts(newPosts)
  }

  function onLogin(newUser) {
    setUser(newUser)
  }

  console.log("---------- POSTS -----------")
  console.log(posts)

  return <div>
    <UserContext.Provider value={user}>
      <Router>
        <Header onLogin={onLogin} user={user}/>
        <Switch>
          <Route exact path="/">
            <Home posts={posts} removePost={removePost}/>
          </Route>
          <Route exact path="/login">
            <Login onLogin={onLogin}/>
          </Route>
          <Route exact path="/signup">
            <Signup onLogin={onLogin}/>
          </Route>
          <Route exact path="/profile">
            <Profile onLogin={onLogin} removePost={removePost}/>
          </Route>
          <Route exact path="/form">
            <PostForm addPost={addPost} onLogin={onLogin}/>
          </Route>
          <Route exact path="/messages">
            <Messages/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  </div>;
}

export default App;
