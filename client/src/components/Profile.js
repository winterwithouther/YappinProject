import React, { useState, useContext } from "react";
import { UserContext } from "../context/Context";
import "../css/Profile.css"

function Profile({removePost}) {
    const {user, setUser} = useContext(UserContext)
    const [settings, setSettings] = useState(false)
  const [newUsername, setNewUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);

  const [newProfilePic, setNewProfilePic] = useState("")

  const [newBio, setNewBio] = useState("")

  function handleChangeUsername(e) {
    setNewUsername(e.target.value);
  }

  function handleSubmitUsername(e) {
    e.preventDefault();

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (Object.keys(data)[0] === "error") {
            setIsUsernameValid(false)
        } else {
            setIsUsernameValid(true)
            setNewUsername("")
            setUser(data)
        }
    })
  }

  function handleChangeProfile(e) {
    setNewProfilePic(e.target.value)
  }

  function handleSubmitProfile(e) {
    e.preventDefault()

    fetch(`/users/${user.id}`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({image_url : newProfilePic})
    })
    .then(response => response.json())
    .then(data => {
        setNewProfilePic("")
        setUser(data)
    })
  }

  function handleChangeBio(e) {
    setNewBio(e.target.value)
  }

  function handleSubmitBio(e) {
    e.preventDefault()

    fetch(`/users/${user.id}`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({bio : newBio})
    })
    .then(response => response.json())
    .then(data => {
        setNewBio("")
        setUser(data)
    })
  }

  function handleClickSettings(e) {
    setSettings(!settings)
  }

  return (
    <div className="profile-container">
      <img src={user.image_url} alt="PROFILE PIC" className="profile-image"/>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      <button onClick={handleClickSettings}>Settings</button>
      {settings ? <div>
        <div className="profile-section">
            <div>
                <form onSubmit={handleSubmitUsername}>
                <input
                    type="text"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={handleChangeUsername}
                />
                <button type="submit">Change username</button>
                {!isUsernameValid && <p style={{ color: "red" }}>Username already exists!</p>}
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmitProfile}>
                    <input
                        type="text"
                        placeholder="Enter new profile picture"
                        value={newProfilePic}
                        onChange={handleChangeProfile}
                    />
                    <button type="submit">Change Profile Picture</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmitBio}>
                    <input
                        type="text"
                        placeholder="New Bio"
                        value={newBio}
                        onChange={handleChangeBio}
                    />
                    <button type="submit">Change Bio</button>
                </form>
            </div>
        </div>
      </div> : <></>}
    </div>
  );
}

export default Profile;