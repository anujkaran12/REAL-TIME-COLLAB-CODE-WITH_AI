import React, { useState, useEffect, useRef, useCallback } from "react";
import Avatar from "react-avatar";
import "./Chat.css";
import { useSocket } from "../context/socketContext";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useSearchParams } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  senderId: any;
  senderName: string;
}

const Chat: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const [searchParams] = useSearchParams();
  const roomID = searchParams.get("ID");
  const socket = useSocket();
  const { userData } = useSelector((state: RootState) => state.User);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom AFTER messages render
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current && open) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    };
    setTimeout(scrollToBottom, 0);
  }, [messages, open]);

  // Receive messages
  useEffect(() => {
    const handleReceive = (data: Message) => {
      setMessages((messages) => [...messages, data]);
      if (!open && data.senderId !== socket?.id) {
        setUnseenCount((prev) => prev + 1);
      }
    };

    const handleTyping = (typingUserName: string) => {
      if (typingUserName !== userData?.name) {
        setTypingUsers((prev) => {
          if (!prev.includes(typingUserName)) return [...prev, typingUserName];
          return prev;
        });
        // Remove after 2 seconds
        setTimeout(() => {
          setTypingUsers((prev) =>
            prev.filter((name) => name !== typingUserName)
          );
        }, 2000);
      }
    };

    socket?.on("receive-msg", handleReceive);
    socket?.on("typing", handleTyping);

    return () => {
      socket?.off("receive-msg", handleReceive);
      socket?.off("typing", handleTyping);
    };
  }, [socket, open, userData?.name]);

  // Emit typing event
  const handleTypingEvent = () => {
    socket?.emit("typing", { roomID, name: userData?.name });
  };

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      senderId: socket?.id,
      senderName: userData?.name as string,
    };
    socket?.emit("send-msg", roomID, newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  }, [input, roomID, socket, userData?.name]);

  // Reset unseen messages when chat opens
  const toggleChat = () => {
    setOpen((prev) => !prev);
    if (!open) setUnseenCount(0);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <div className="chat-circle" onClick={toggleChat}>
        <i className="bi bi-chat-dots-fill"></i>
        {unseenCount > 0 && <span className="chat-badge">{unseenCount}</span>}
      </div>

      {open && (
        <div className="chat-container">
          <div className="chat-header">
            Room Chat
            <span className="close-btn" onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="chat-messages" ref={messagesContainerRef}>
            {messages.map((msg) => {
              const isMe = msg.senderId === socket?.id;
              return (
                <div
                  key={msg.id}
                  className={`chat-message-row ${isMe ? "me" : "other"}`}
                >
                  {!isMe && (
                    <Avatar
                      name={msg.senderName}
                      size="32"
                      round
                      className="chat-avatar"
                    />
                  )}
                  <div className={`chat-bubble ${isMe ? "me" : "other"}`}>
                    {msg.text}
                  </div>
                  {isMe && (
                    <Avatar
                      name="You"
                      size="32"
                      round
                      className="chat-avatar"
                    />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="chat-typing">
                {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleTypingEvent();
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
