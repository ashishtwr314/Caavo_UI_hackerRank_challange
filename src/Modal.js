import React from "react";
import UserCard from "./UserCard";

function Modal({
  groupName,
  groupLogo,
  groupDesc,
  setShowModal,
  allUsers,
  selectedUsers,
}) {
  return (
    <div className="modal">
      <div className="modal-container">
        <button onClick={() => setShowModal(false)} className="close-btn">
          &times;
        </button>
        <h1>{groupName}</h1>
        <p>{groupDesc}</p>
        <div className="modal-content">
          <div className="group-image">
            <img src={groupLogo} />
          </div>
          <div className="group-members">
            {selectedUsers.includes("1003")}
            {allUsers.map((user) =>
              selectedUsers.includes(user.id) ? (
                <UserCard readOnly userInfo={user} />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
