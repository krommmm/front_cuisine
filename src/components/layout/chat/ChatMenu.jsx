import { useState, useEffect, useRef } from "react";
import { ChatBase } from "./ChatBase";
import { ChatRoom } from "./ChatRoom";
import { ChatList } from "./ChatList";
import { getMyProfil, getUsers } from "../../../services/auth";
import { io } from "socket.io-client";
import { HOST } from "../../../host";
import { getMyId } from "../../../services/auth";

export function ChatMenu() {
  const [chatMode, setChatMode] = useState(true);
  const [myProfil, setMyProfil] = useState({});
  const [users, setUsers] = useState([]);
  const [roomTargetUserId, setRoomTargetUserId] = useState("");
  const [whosCalled, setWhosCalled] = useState([]);
  const socketRef = useRef(null);
  socketRef.current = io(`${HOST}`, { withCredentials: true });

  useEffect(() => {
    setUpMyProfil();
    setUpUsersProfils();

  }, []);

  useEffect(() => {
    connectToSocket();
  }, [users]);

  async function connectToSocket() {

    await socketRef.current.on("connect", () => {
      console.log("Connected to server:", socketRef.current.id);
    });

    const resId = await getMyId();
    socketRef.current.emit('setUserId', resId.data.userId);

    socketRef.current.on('notificationAuCopain', (room, copain) => {
      console.log(`${copain} vous a invité sur la room ${room}`);
      console.log("invitation du copain");

      if (users.length <= 0) {
        console.log("Les utilisateurs ne sont pas encore chargés !");
        return;
      }

      let allUsers = JSON.parse(JSON.stringify(users)); // Copie de l'état actuel des utilisateurs
      let receiver = allUsers.find((user) => user._id === copain);
      if (receiver && receiver._id === copain) {
        receiver.isCalled = true;
        setWhosCalled(allUsers);
      }
    });

    socketRef.current.on('cleanAlert', () => {
      setWhosCalled([]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }

  async function setUpMyProfil() {
    const res = await getMyProfil();
    if (res.ok) {
      setMyProfil(res.data.user);
    }
  }

  async function setUpUsersProfils() {
    const res = await getUsers();
    if (res.ok) {
      setUsers(res.data.users);

      if (res.data.users.length > 0) {
        setRoomTargetUserId("");
      }
    }
  }

  return (
    <div className="chatMenu">
      <div className="chatMenu__content">
        {myProfil && (
          <ChatBase
            myProfil={myProfil}
            chatMode={chatMode}
            onUpdateChatMode={setChatMode}
          />
        )}
        {users && !chatMode && (
          <ChatList users={users} onUpdateUserId={setRoomTargetUserId} whosCalled={whosCalled} />
        )}
      </div>
      {roomTargetUserId !== "" ? (
        <ChatRoom
          userId={roomTargetUserId}
          onUpdateUserId={setRoomTargetUserId}
          users={users}
          onUpdateWhosCalled={setWhosCalled}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
