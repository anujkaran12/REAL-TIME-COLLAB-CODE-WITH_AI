import React, { useEffect, useRef, useState } from "react";
import "./Participants.css";
import { useSocket } from "../../context/socketContext";
import { useSearchParams } from "react-router-dom";

interface Iprop {
  participantsData: any[];
  hostSocketId: string;
}

const Participants: React.FC<Iprop> = ({ participantsData, hostSocketId }) => {
  const socket = useSocket();
  const [params] = useSearchParams();
  const roomId = params.get("ID") || "";
 



  useEffect(() => {
   
    return () => {
      socket?.off("audioStream");
      
    };
  }, [socket]);

 

  return (
    <div className="participants-container">
      <h3 className="participants-header">
        Participants ({participantsData.length})
      </h3>
      <div className="participants-grid">
        {participantsData.map((p, i) => (
          <div key={i} className="participant">
            <div className="avatar">
              <img
                src={p.userData.avatar.secure_url}
                alt={p.userData.name}
                width="100%"
                height="100%"
                loading="lazy"
              />
              
              {p.socketID === socket?.id && <span className="you-label">YOU</span>}
            </div>
            <p>{p.userData.name}</p>
            {p.socketID === hostSocketId && <span className="host-label">Host</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;