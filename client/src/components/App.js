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
    <Router>
      <Header onLogin={onLogin} user={user}/>
      <Switch>
        <Route exact path="/">
          <Home user={user} posts={posts} removePost={removePost}/>
        </Route>
        <Route exact path="/login">
          <Login onLogin={onLogin}/>
        </Route>
        <Route exact path="/signup">
          <Signup onLogin={onLogin}/>
        </Route>
        <Route exact path="/profile">
          <Profile user={user} onLogin={onLogin}/>
        </Route>
        <Route exact path="/form">
          <PostForm addPost={addPost} user={user} onLogin={onLogin}/>
        </Route>
        <Route exact path="/messages">
          <Messages/>
        </Route>
      </Switch>
    </Router>
  </div>;
}

export default App;
