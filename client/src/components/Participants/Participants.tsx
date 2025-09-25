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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Store the MediaStream
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const isStoppingRef = useRef(false);

  const startMic = async () => {
    if (!socket) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      streamRef.current = stream; // Store the stream
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks: Blob[] = [];
      mediaRecorderRef.current = mediaRecorder;
      setIsMicOn(true);

      mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      });

      mediaRecorder.addEventListener("stop", () => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: "audio/ogg" });
          const fileReader = new FileReader();
          fileReader.readAsDataURL(audioBlob);
          fileReader.onloadend = () => {
            const base64String = fileReader.result as string;
            socket.emit("audioStream", roomId, base64String);
          };
        }
        audioChunks = []; // Reset chunks

        // Only restart recording if not stopping intentionally
        if (!isStoppingRef.current && mediaRecorderRef.current) {
          mediaRecorderRef.current.start();
          setTimeout(() => {
            if (mediaRecorderRef.current?.state === "recording") {
              mediaRecorderRef.current.stop();
            }
          }, 400);
        }
      });

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }, 400);
    } catch (error) {
      console.error("Error capturing audio:", error);
      setIsMicOn(false);
    }
  };

  const stopRecording = () => {
    isStoppingRef.current = true;
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    setIsMicOn(false);
    isStoppingRef.current = false;
  };

  useEffect(() => {
    socket?.on("audioStream", (audioData: string) => {
      const newData = audioData.split(";");
      newData[0] = "data:audio/ogg;";
      const audioUrl = newData[0] + newData[1];

      const audio = new Audio(audioUrl);
      if (!audio || document.hidden) {
        return;
      }
      audio.play().catch((error) => console.error("Error playing audio:", error));
    });

    return () => {
      socket?.off("audioStream");
      stopRecording(); // Clean up on component unmount
    };
  }, [socket]);

  const renderMicToHostAndCurrentUser = (socketID: string) => {
    if (socketID === socket?.id) {
      return (
        <button
          className={`mic-btn ${isMicOn ? "mic-on" : "mic-off"}`}
          onClick={() => (isMicOn ? stopRecording() : startMic())}
        >
          <i className={isMicOn ? "bi bi-mic-fill" : "bi bi-mic-mute-fill"}></i>
        </button>
      );
    }
    return null;
  };

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
              {renderMicToHostAndCurrentUser(p.socketID)}
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