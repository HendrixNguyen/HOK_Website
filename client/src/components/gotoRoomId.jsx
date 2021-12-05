import axios from "axios";
import React, { useState } from "react";
// import shortId from "shortid";

const goToRoom = (history, roomId) => {
  history.push(`/${roomId}`);
};

export function goToRoomInput({ history }) {
  let [roomId, setRoomId] = useState(getRoomId());

  const getRoomId = async () => {
    await axios
      .get("http://localhost:3000")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="enter-room-container">
      <form>
        <input
          type="text"
          value={roomId}
          placeholder="Room id"
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
        />
        <button
          onClick={() => {
            goToRoom(history, roomId);
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}
