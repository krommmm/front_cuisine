import { HOST } from "../../host";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";


export function Users() {

    const [users, setUsers] = useState([]);
    const { state, dispatch } = useAuth();

    useEffect(() => {
        controller();
    }, []);

    async function controller() {
        const res = await getUsers();
        if (res.ok) setUsers(res.data.users);
    }

    return (
        <div className="usersPage">
            <div className="usersPage__users">
                <div className="usersPage__users__content">
                    <div className="usersPage__users__content__header">
                        <p>Utilisateurs</p>
                    </div>
                    {users.map((user, index) => (
                        <div key={index} className="usersPage__users__content__fiche">
                            <div className="usersPage__users__content__fiche--profile"><img src={`${HOST}/api/images/avatars/${user.img_url}.png`} /><p>{user.name}</p></div>
                            <div className={`usersPage__users__content__fiche--isConnected userIconnected--${user.isConnected===0 ? "false" : "true"}`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}