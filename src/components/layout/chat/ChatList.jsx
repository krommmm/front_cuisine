import { HOST } from "../../../host";
import { useEffect, useState, useRef } from "react";
import { getMyId } from "../../../services/auth"

export function ChatList({ users, onUpdateUserId, whosCalled }) {

    const [dataUsers, setDataUsers] = useState([]);
    const [myUsers, setMyUsers] = useState([]);



    useEffect(() => {
        // récupérer l'id du user et supprimer son profil de users
        controller();
    }, [users])

    async function controller() {
        if (whosCalled && whosCalled.length > 0) {
            const calledUsersFiltered = await filterMyUser();
            setDataUsers(calledUsersFiltered);
            return;
        }
        const usersWithoutme = await filterMyUser();
        setDataUsers(usersWithoutme);
    };

    async function filterMyUser() {
        const resId = await getMyId();
        const myId = resId.data.userId;
        const res = users.filter((user) => user._id !== myId);
        setMyUsers(res);
        return res;
    }

    async function searchUsers(e) {
        e.preventDefault();
        const query = e.target.value.toLowerCase();
        let tempoDataUsers = JSON.parse(JSON.stringify(dataUsers));
        const res = tempoDataUsers.filter((user) => user.name.toLowerCase().includes(query));
        console.log(res);
        setMyUsers(res);
    }


    function setUpRoomInfo(e) {
        const userId = e.currentTarget.dataset.id;

        setTimeout(() => {
            onUpdateUserId(userId);
        }, 200);
        onUpdateUserId("");

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

                {whosCalled.length <= 0 ? (myUsers.map((user, index) => (
                    <div className="chatList__fiche" key={index} data-id={user._id} onClick={(e) => setUpRoomInfo(e)}>
                        <div className="chatList__fiche__profil">
                            <img src={`${HOST}/api/images/avatars/${user.img_url}`} />
                            <div className={`chatList__fiche__isConnected userIconnected--${user.isConnected === 0 ? "false" : "true"}`}></div>
                            <p>{user.name}</p>
                        </div>
                    </div>
                ))) : (myUsers.map((user, index) => (
                    <div className="chatList__fiche" key={index} data-id={user._id} onClick={(e) => setUpRoomInfo(e)}>
                        <div className="chatList__fiche__profil">
                            <img src={`${HOST}/api/images/avatars/${user.img_url}`} />
                            <div className={`chatList__fiche__isConnected userIconnected--${user.isConnected === 0 ? "false" : "true"}`}></div>
                            <p>{user.name}</p>
                            {user.isCalled && <p className="chatList__fiche__alert">🔔</p>}
                        </div>
                    </div>
                )))}


            </div>
        </div>
    );
}

