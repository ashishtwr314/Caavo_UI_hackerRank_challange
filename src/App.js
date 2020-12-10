import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import "./App.css";
import axios from "axios";
import Modal from "./Modal";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupLogo, setGroupLogo] = useState(
    "https://static.thenounproject.com/png/3927-200.png"
  );
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const userClick = (userInfo) => {
    const id = userInfo.id;
    const selectedUsersLocal = [...selectedUsers];

    if (selectedUsersLocal.includes(id)) {
      selectedUsersLocal.splice(selectedUsersLocal.indexOf(id), 1);
    } else {
      selectedUsersLocal.push(id);
    }
    setSelectedUsers(selectedUsersLocal);
  };

  const updateClick = () => {
    if (!groupDesc || !groupName) {
      return alert("Please Define a Group Name and a Description");
    }

    if (selectedUsers.length == 0) {
      return alert("Please Select any one user to form a group");
    }
    setShowModal(true);
  };

  const removeClick = () => {
    setSelectedUsers([]);
    setGroupName("");
    setGroupDesc("");
    setGroupLogo("https://static.thenounproject.com/png/3927-200.png");
  };

  const getAllUsers = async () => {
    const allUsers = await axios.get(process.env.REACT_APP_API_ENDPOINT);

    setAllUsers(allUsers.data);
  };

  const sort = (mode) => {
    const allUsersLocal = [...allUsers];

    allUsersLocal.sort((a, b) => {
      if (mode == "asc") {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      } else if (mode == "desc") {
        return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
      }
    });

    setAllUsers(allUsersLocal);
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", (e) => {
      console.log(e.target.result);
      setGroupLogo(e.target.result);
    });
  };

  return (
    <>
      <div
        className="wrapper"
        style={showModal ? { filter: "blur(2px)" } : { filter: "blur(0px)" }}
      >
        <div className="container">
          <h1>Create Group</h1>
          <div className="create-group-form">
            <form>
              <div className="group-logo-selector">
                <label className="imageUploaderIcon" for="img">
                  <img src={groupLogo} />
                </label>
                <input
                  onChange={(e) => handleImageUpload(e)}
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                />
                <h3>Upload Group Logo</h3>
              </div>
              <div>
                <input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  type="text"
                  placeholder="Group Name"
                />
                <input
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                  type="text"
                  placeholder="Group Description"
                />
              </div>
            </form>
          </div>
          <div className="sort-btns">
            <div className="sort-btn" onClick={() => sort("asc")}>
              A - Z
            </div>
            <div className="sort-btn" onClick={() => sort("desc")}>
              Z - A
            </div>
          </div>
          <div className="user-cards">
            {allUsers.map((user) => (
              <UserCard
                selectedUsers={selectedUsers}
                userClick={userClick}
                userInfo={user}
              />
            ))}
          </div>

          <div className="cta-buttons">
            <button
              onClick={updateClick}
              type="button"
              className="btn update-btn"
            >
              Update
            </button>
            <button
              onClick={() => removeClick()}
              type="button"
              className="btn remove-btn"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          groupName={groupName}
          groupLogo={groupLogo}
          groupDesc={groupDesc}
          selectedUsers={selectedUsers}
          allUsers={allUsers}
          userClick={userClick}
        />
      ) : null}
    </>
  );
}

export default App;
