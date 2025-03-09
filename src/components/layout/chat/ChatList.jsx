import { HOST } from "../../../host";
import { useEffect, useState } from "react";
import { getMyId } from "../../../services/auth"

export function ChatList({ users, onUpdateUserId, knock }) { 

    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        // récupérer l'id du user et supprimer son profil de users
        async function controller(){
            const resId = await getMyId();
            const myId = resId.data.userId;
            const usersWithoutMe = users.filter((user)=>user._id!==myId);
            console.log(users);
            setDataUsers(usersWithoutMe);
        };
        controller();
    }, [users])

    function searchUsers(e) {
        const query = e.target.value.toLowerCase();
        setDataUsers(users.filter(user => 
          user.name.toLowerCase().includes(query) 
        ));
      }
      

      function setUpRoomInfo(e){
        const userId = e.currentTarget.dataset.id; 

        setTimeout(()=>{
            onUpdateUserId(userId);
        },200);
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
                {dataUsers.map((user, index) => (
                    <div className="chatList__fiche" key={index} data-id={user._id} onClick={(e)=>setUpRoomInfo(e)}>
                        <div className="chatList__fiche__profil">
                            <img src={`${HOST}/api/images/avatars/${user.img_url}.png`} />
                            <div className={`chatList__fiche__isConnected userIconnected--${user.isConnected === 0 ? "false" : "true"}`}></div>
                            <p>{user.name}</p>
                        </div>
                        {console.log(knock)}
                        {console.log(user._id)}
                        {knock && knock===user._id && <p>🔔</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}