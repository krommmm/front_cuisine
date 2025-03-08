import { HOST } from "../../../host";
import { useEffect, useState } from "react";

export function ChatList({ users, onUpdateUserId }) {

    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        setDataUsers(users);
    }, [users])

    function searchUsers(e) {
        e.preventDefault();
        const query = e.target.value;
        const myUsers = users;
        const usersFiltered = myUsers.filter((user) => user.name.toLowerCase().startsWith(query.toLowerCase()));
        setDataUsers(usersFiltered);
    }

    function setUpRoomInfo(e){
        e.preventDefault();
        const userId = e.target.dataset.id;
        onUpdateUserId(userId);
    }

    return (
        <div className="chatList">
            <div className="chatList__searchBar">
                <form>
                    <input type="text" placeholder="Rechercher" onChange={(e) => searchUsers(e)} />
                    <button type="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
            <div className="chatList__fiches">
                {dataUsers.map((user, index) => (
                    <div className="chatList__fiche" key={index} data-id={user._id} onClick={(e)=>setUpRoomInfo(e)}>
                        <div className="chatList__fiche__profil">
                            <img src={`${HOST}/api/images/avatars/${user.img_url}.png`} />
                            <div className={`chatList__fiche__isConnected userIconnected--${user.isConnected === 0 ? "false" : "true"}`}></div>
                            <p>{user.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}