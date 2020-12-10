import React from "react";
import "./App.css";

function UserCard({ readOnly, selectedUsers, userClick, userInfo }) {
  return (
    <div
      key={userInfo.id}
      onClick={() => userClick(userInfo)}
      className={readOnly ? "user-card read-only" : "user-card"}
    >
      {!readOnly && selectedUsers.includes(userInfo.id) ? (
        <div className="selected">
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/56/white-heavy-check-mark_2705.png" />
        </div>
      ) : null}

      <div className="user-image">
        <img src={userInfo.Image} />
      </div>
      <div className="user-name">{userInfo.name}</div>
    </div>
  );
}

export default UserCard;
