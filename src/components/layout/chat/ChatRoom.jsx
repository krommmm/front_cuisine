import { HOST } from "../../../host";

export function ChatRoom({ onUpdateUserId, historyChat, onUpdateMessage, userToChat }) {

  function leaveRoom(e) {
    e.preventDefault();
    // onUpdateUserId("");
    onUpdateUserId("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = e.target.message.value;
    if (msg.trim() === "") return;
    // sendMessage(myId, userId, msg);
    onUpdateMessage(msg);
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
          {historyChat && historyChat.length > 0 && historyChat.map((cell) => (
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
