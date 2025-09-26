import React, { useState } from "react";
import "./RoomToggle.css";
import ButtonLoader from "../Utility/ButtonLoader/ButtonLoader";
import { usePopup } from "../../context/popupContext";

interface IRommTogglePROP {
  handleCreateRoom: (roomTitle: string, roomPassword: string) => void;
  handleJoinRoom: (roomID: string, roomPassword: string) => void;
  btnLoading: boolean;
}

const RoomToggle: React.FC<IRommTogglePROP> = ({
  handleCreateRoom,
  handleJoinRoom,
  btnLoading,
}) => {
  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const [roomTitle, setRoomTitle] = useState("");
  const [roomID, setRoomID] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const { showPopup } = usePopup();
  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };
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
              className="input-letter-space"
              type="text"
              placeholder="Enter Room ID"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              minLength={5}
            />
            <div style={{ position: "relative" }}>
              <input
                className="input-letter-space"
                type={passwordType}
                placeholder="Enter Room Password"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                maxLength={5}
              />

              {passwordType === "password" ? (
                <i className="bi bi-eye" onClick={passwordToggle}></i>
              ) : (
                <i className="bi bi-eye-slash" onClick={passwordToggle}></i>
              )}
            </div>
            <button
              onClick={() => {
                if (!roomID.trim()) {
                  showPopup("Room ID required", "WARNING");
                  return;
                }

                if (!roomPassword.trim()) {
                  showPopup("Password Required", "WARNING");
                  return;
                }
                handleJoinRoom(roomID, roomPassword);
              }}
              disabled={btnLoading}
            >
              {btnLoading ? <ButtonLoader /> : "Join"}
            </button>
          </div>
        ) : (
          <div className="form">
            <h3>CREATE ROOM</h3>
            <input
              type="text"
              placeholder="Enter Room Title"
              value={roomTitle}
              minLength={3}
              onChange={(e) => setRoomTitle(e.target.value)}
              required
            />
            <div style={{ position: "relative" }}>
              <input
                className="input-letter-space"
                type={passwordType}
                placeholder="Set Room Password"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                required
              />
              {passwordType === "password" ? (
                <i className="bi bi-eye" onClick={passwordToggle}></i>
              ) : (
                <i className="bi bi-eye-slash" onClick={passwordToggle}></i>
              )}
            </div>
            <button
              onClick={() => {
                if (!roomTitle.trim()) {
                  showPopup("Room ID required", "WARNING");
                  return;
                }

                if (!roomPassword.trim()) {
                  showPopup("Password Required", "WARNING");
                  return;
                }
                handleCreateRoom(roomTitle, roomPassword);
              }}
              disabled={btnLoading}
            >
              {btnLoading ? <ButtonLoader /> : "Create"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomToggle;
