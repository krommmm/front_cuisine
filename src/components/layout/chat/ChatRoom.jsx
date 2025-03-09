import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "../../../host";
import { getMyId } from "../../../services/auth";

export function ChatRoom({ userId, onUpdateUserId, users }) {
  const [myId, setMyId] = useState(null);
  const [userToChat, setUserToChat] = useState(null);
  const socketRef = useRef(null);
  const [historyChat, setHistoryChat] = useState([]);
  const messagesEndRef = useRef(null);

  // Récupération de l'ID utilisateur
  useEffect(() => {
    const fetchMyId = async () => {
      try {
        const res = await getMyId();
        setMyId(res.data.userId);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID :", error);
      }
    };
    fetchMyId();
  }, []);

  // Configuration de l'utilisateur cible
  useEffect(() => {
    if (userId && users) {
      const targetUser = users.find(user => user._id === userId);
      setUserToChat(targetUser);
    }
  }, [userId, users]);

  // Gestion des sockets et messages
  useEffect(() => {
    if (!myId || !userId) return;

    socketRef.current = io(HOST, {
      withCredentials: true,
      reconnectionAttempts: 3,
      timeout: 5000
    });

    const socket = socketRef.current;

    const handleConnect = () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joinPrivateChat", myId, userId);
    };

    const handleMessage = (data) => {
      setHistoryChat(prev => [
        ...prev,
        {
          senderId: data.sender,
          message: data.message,
          timestamp: new Date(data.timestamp),
          tempId: Date.now() // Pour les messages optimistes
        }
      ]);
    };

    const handleError = (error) => {
      console.error("Socket error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("receiveMessage", handleMessage);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("receiveMessage", handleMessage);
      socket.off("connect_error", handleError);
      socket.disconnect();
    };
  }, [myId, userId]);

  // Défilement automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyChat]);

  const sendMessage = (message) => {
    if (!message.trim() || !socketRef.current) return;

    // Message optimiste
    const tempMessage = {
      senderId: myId,
      message,
      timestamp: new Date(),
      tempId: Date.now()
    };

    setHistoryChat(prev => [...prev, tempMessage]);

    socketRef.current.emit("sendMessage", {
      sender: myId,
      receiver: userId,
      message,
      timestamp: tempMessage.timestamp
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (!message) return;
    
    sendMessage(message);
    e.target.reset();
  };

  const leaveRoom = () => {
    onUpdateUserId("");
  };

  if (!userToChat) return null;

  return (
    <div className="chatRoom">
      <div className="chatRoom__content">
        <header className="chatRoom__header">
          <div className="chatRoom__header-profile">
            <img 
              src={`${HOST}/api/images/avatars/${userToChat.img_url}.png`} 
              alt={`Avatar de ${userToChat.name}`}
            />
            <div className={`connection-status ${userToChat.isConnected ? "online" : "offline"}`} />
            <h2>{userToChat.name}</h2>
          </div>
          <button 
            onClick={leaveRoom}
            aria-label="Fermer la conversation"
            className="chatRoom__close-button"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </header>

        <div className="chatRoom__messages">
          {historyChat.map((message) => (
            <div
              key={message.tempId || message._id}
              className={`message ${message.senderId === myId ? "sent" : "received"}`}
            >
              {message.senderId !== myId && (
                <img
                  src={`${HOST}/api/images/avatars/${userToChat.img_url}.png`}
                  alt={`Avatar de ${userToChat.name}`}
                  className="message__avatar"
                />
              )}
              <div className="message__content">
                <p className="message__text">{message.message}</p>
                <time className="message__time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chatRoom__form">
          <div className="chatRoom__input-container">
            <textarea
              name="message"
              placeholder="Écrivez votre message..."
              aria-label="Zone de saisie de message"
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit(e)}
            />
            <button type="submit" className="chatRoom__send-button">
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
