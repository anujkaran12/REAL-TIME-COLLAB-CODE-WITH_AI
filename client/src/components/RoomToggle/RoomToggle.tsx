import React, { useState } from "react";
import "./RoomToggle.css";
import ButtonLoader from "../Utility/ButtonLoader/ButtonLoader";

interface IRommTogglePROP {
  handleCreateRoom: (roomTitle: string, roomPassword: string) => void;
  handleJoinRoom: (roomID: string, roomPassword: string) => void;
  btnLoading: boolean;
  setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomToggle: React.FC<IRommTogglePROP> = ({
  handleCreateRoom,
  handleJoinRoom,
  btnLoading,
  setBtnLoading
}) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const [roomTitle, setRoomTitle] = useState("");
  const [roomID, setRoomID] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  return (
    <div className="room-toggle-container">
      {/* Toggle Buttons */}
      <div className="toggle-switch">
        <button
          className={activeTab === "join" ? "active" : ""}
          onClick={() => setActiveTab("join")}
        >
          Join Room
        </button>
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create Room
        </button>
        <div className={`slider ${activeTab}`} />
      </div>

      {/* Content */}
      <div className="tab-content">
        {activeTab === "join" ? (
          <div className="form">
            <h3>JOIN ROOM</h3>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Room Password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
            <button onClick={() => handleJoinRoom(roomID, roomPassword)} disabled={btnLoading}>
              {btnLoading ? <ButtonLoader/>:"Join"}
              
            </button>
          </div>
        ) : (
          <div className="form">
            <h3>CREATE ROOM</h3>
            <input
              type="text"
              placeholder="Enter Room Title"
              value={roomTitle}
              onChange={(e) => setRoomTitle(e.target.value)}
            />
            <input
              type="password"
              placeholder="Set Room Password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
            <button onClick={() => handleCreateRoom(roomTitle, roomPassword)} disabled={btnLoading}>
               {btnLoading ? <ButtonLoader/>:"Create"}
             
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomToggle;
