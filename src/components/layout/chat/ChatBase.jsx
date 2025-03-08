import { HOST } from "../../../host";

export function ChatBase({ myProfil, chatMode, onUpdateChatMode }) {



    function openChatList(e) {
        onUpdateChatMode((prev) => !prev);
    }

    return (
        <div className="chatBase">
            <div className="chatBase__profile">
                <img src={`${HOST}/api/images/avatars/${myProfil.img_url}.png`} />
                <p>Messagerie</p>
            </div>
            <i className={`fa-solid fa-angle-${chatMode ? "up" : "down"} chat--up`} onClick={(e) => openChatList(e)}></i>
        </div>
    );
}