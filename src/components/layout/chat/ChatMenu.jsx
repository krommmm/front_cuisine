import { useState, useEffect } from "react";
import { ChatBase } from "./ChatBase";
import { ChatRoom } from "./ChatRoom";
import { ChatList } from "./ChatList";
import { getMyProfil, getUsers } from "../../../services/auth";
import { getMyId } from "../../../services/auth";
import { socket } from "../../../functions/socket";
import { getMessages, cleanMessages } from "../../../services/messages";

export function ChatMenu() {
  const [chatMode, setChatMode] = useState(true);
  const [myProfil, setMyProfil] = useState({});
  const [users, setUsers] = useState([]);
  const [roomTargetUserId, setRoomTargetUserId] = useState("");
  const [whosCalled, setWhosCalled] = useState([]);
  const [myId, setMyId] = useState(null);
  const [userToChat, setUserToChat] = useState();
  const [historyChat, setHistoryChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function init() {
      await setUpUsersProfils();
      await setUpMyProfil();
      fetchMyId();
    };
    init();
  }, [])

  async function fetchMyId() {
    try {
      const resId = await getMyId();
      setMyId(resId.data.userId);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID :", error);
    }
  }

  // partie socket
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connecté au serveur WebSocket avec ID :", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Déconnecté du serveur WebSocket");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);


  useEffect(() => {
    socket.emit('setUserId', myId);
  }, [myId]);

  useEffect(() => {
    socket.on("receiveMessage", async (data) => {
      // const myUsersRes = await getUsers();
      // const myUsers = myUsersRes.data.users;
      console.log(`Message from ${data.sender}: ${data.message}`);
      // const sender = (myUsers.filter((user) => user._id === data.sender))[0];
      // setHistoryChat((prevS) => [...prevS, ({ name: sender.name, img_url: sender.img_url, msg: data.message })]);
      const res = await getMessages(data.sender, data.receiver);
      const messages = res.data.messages;
      const updateMessages = updateDate(messages);
      setHistoryChat(updateMessages);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);


  useEffect(() => {
    socket.on('notificationAuCopain', (room, copain) => {
      console.log(`${copain} vous a invité sur la room ${room}`);
      console.log("invitation du copain");


      async function indiquerQuiAppel() {
        const myUsersRes = await getUsers();
        const myUsers = myUsersRes.data.users;
        if (myUsers.length <= 0) {
          console.log("Les utilisateurs ne sont pas encore chargés !");
          return;
        }

        let allUsers = JSON.parse(JSON.stringify(myUsers)); // Copie de l'état actuel des utilisateurs
        let receiver = allUsers.find((user) => user._id === copain);
        if (receiver && receiver._id === copain) {
          receiver.isCalled = true;
          setWhosCalled(allUsers);
        }
      }
      indiquerQuiAppel();


    });

    return () => {
      socket.off("notificationAuCopain");
    };
  }, []);


  useEffect(() => {
    socket.on('cleanAlert', () => {
      setWhosCalled([]);
      console.log("users cleaned")
    });

    return () => {
      socket.off("cleanAlert");
    };
  }, []);




  useEffect(() => {
    findTargetedUser();
  }, [roomTargetUserId]);

  function findTargetedUser() {
    const userSearched = users.filter((user) => user._id === roomTargetUserId);
    setUserToChat(userSearched[0]);
  }

  useEffect(() => {
    if (myId && roomTargetUserId) {
      console.log(`Joining private chat between ${myId} and ${roomTargetUserId}`);
      joinPrivateChat(myId, roomTargetUserId);
    }
  }, [myId, roomTargetUserId]); // Cette effect se lance chaque fois que myId ou userId change


  async function joinPrivateChat(userId1, userId2) {
    await cleanMessages(userId1, userId2);
    const res = await getMessages(userId1, userId2);
    const messages = res.data.messages;
    console.log(messages);
    const updateMessages = updateDate(messages);
    setHistoryChat(updateMessages);
    socket.emit("joinPrivateChat", userId1, userId2);
    console.log(historyChat);
  }

  async function sendMessage(sender, receiver, message) {
    socket.emit("sendMessage", { sender, receiver, message });
    const res = await getMessages(sender, receiver);
    const messages = res.data.messages;
    const updateMessages = updateDate(messages);
    console.log(updateMessages);
    setHistoryChat(updateMessages);
  }

  useEffect(() => {
    if (socket && myId && roomTargetUserId && message) {
      sendMessage(myId, roomTargetUserId, message);
    }
  }, [message]);


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

  function updateDate(messages) {
    for (let i = 0; i < messages.length; i++) {
      const timeStamp = messages[i].created_at;
      const date = new Date(timeStamp);
      const dateData = {
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      }
      messages[i].dateData = dateData;
    }
    return messages;
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
          historyChat={historyChat}
          onUpdateMessage={setMessage}
          userToChat={userToChat}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
