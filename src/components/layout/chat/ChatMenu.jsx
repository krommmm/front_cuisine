import { useState, useEffect } from "react";
import { ChatBase } from "./ChatBase";
import { ChatRoom } from "./ChatRoom";
import { ChatList } from "./ChatList";
import { getMyProfil, getUsers } from "../../../services/auth";

export function ChatMenu() {
  const [chatMode, setChatMode] = useState(true);
  const [myProfil, setMyProfil] = useState({});
  const [users, setUsers] = useState([]);
  const [roomTargetUserId, setRoomTargetUserId] = useState("");

  useEffect(() => {
    setUpMyProfil();
    setUpUsersProfils();
  }, []);

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
          <ChatList users={users} onUpdateUserId={setRoomTargetUserId} />
        )}
      </div>
      {roomTargetUserId !== "" ? (
        <ChatRoom
          userId={roomTargetUserId}
          onUpdateUserId={setRoomTargetUserId}
          users={users}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
