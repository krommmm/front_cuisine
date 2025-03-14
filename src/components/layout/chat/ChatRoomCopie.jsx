import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { HOST } from "../../../host";
import { getMyId } from "../../../services/auth";

export function ChatRoom({ userId, onUpdateUserId, users }) {
  const [myId, setMyId] = useState(null);
  const [userToChat, setUserToChat] = useState();
  const socketRef = useRef(null);
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    async function fetchMyId() {
      try {
        const resId = await getMyId();
        setMyId(resId.data.userId);
        const userSearched = users.filter((user) => user._id === userId);
        setUserToChat(userSearched[0]);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID :", error);
      }
    }

    fetchMyId();

    // Création de la connexion socket une seule fois
    socketRef.current = io(`${HOST}`, { withCredentials: true });

    socketRef.current.on("connect", () => {
      console.log("Connected to server:", socketRef.current.id);
    });

    socketRef.current.on("receiveMessage", (data) => {
      console.log(`Message from ${data.sender}: ${data.message}`);
      const sender = (users.filter((user) => user._id === data.sender))[0];
      setHistoryChat((prevS) => [...prevS, ({ name: sender.name, img_url: sender.img_url, msg: data.message })]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []); // Cette effect se lance une seule fois, lors du premier rendu
  

  useEffect(() => {
    if (myId && userId) {
      console.log(`Joining private chat between ${myId} and ${userId}`);
      joinPrivateChat(myId, userId);
    }
  }, [myId, userId]); // Cette effect se lance chaque fois que myId ou userId change



  function joinPrivateChat(userId1, userId2) {
    socketRef.current.emit("joinPrivateChat", userId1, userId2);
  }

  function sendMessage(sender, receiver, message) {
    socketRef.current.emit("sendMessage", { sender, receiver, message });
  }

  function leaveRoom(e) {
    e.preventDefault();
    onUpdateUserId("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = e.target.message.value;
    if (msg.trim() === "") return;
    sendMessage(myId, userId, msg);
    e.target.reset();
  }

  return (
    <div className="chatRoom">
      <div className="chatRoom__content">
        <div className="chatRoom__content__header">
          <div className="chatRoom__content__header--profil">
            {userToChat && <img src={`${HOST}/api/images/avatars/${userToChat.img_url}.png`} />}
            {userToChat && <p>{userToChat.name}</p>}
          </div>
          <i className="fa-solid fa-xmark leaveRoom" onClick={leaveRoom}></i>
        </div>
        <div className="chatRoom__content__chat">
          {historyChat && historyChat.length > 0 && historyChat.map((cell, index) => (
            // <p key={index}>{msg}</p>
            <div key={cell._id}>
              <div>
                <img src={`${HOST}/api/images/avatars/${cell.img_url}.png`} /><p>{cell.name}</p>
              </div>
              <p>{cell.msg}</p>
            </div>
          ))}
        </div>
        <div className="chatRoom__content__footer">
          <form onSubmit={handleSubmit}>
            <div className="chatRoom__content__footer__input">
              <input type="text" name="message" placeholder="Rédigez un message..." />
            </div>
            <div className="chatRoom__content__footer__send">
              <button type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
