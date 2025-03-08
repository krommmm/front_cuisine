import { useState } from "react";
import { logIn } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";
import { isAdmin, isUserConnected } from "../../services/auth";

export function LogInForm() {

    const { state, dispatch } = useAuth();

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const res = await logIn(formData);
        displayAnswer(res); 

        const resAdmin = await isAdmin();
        if (resAdmin.ok && resAdmin.data.isAdmin === 1) {
            dispatch({ type: "SET_ADMIN", payload: true });
        } else {
            dispatch({ type: "LOGOUT" });  // ou => dispatch({ type: "SET_ADMIN", payload: false }); 
        }

        const resUser = await isUserConnected();
        if (resUser.ok && resUser.data.isUser) {
            dispatch({ type: "SET_USER", payload: true });
        } else {
            dispatch({ type: "LOGOUT" });
        }

    }

    function displayAnswer(res) {
        if (!res.ok) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: false, msg: res.data.msg }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false, msg: res.data.msg }));
        } else if (res.ok) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: false, msg: res.data.msg }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true, msg: res.data.msg }));
        }
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" placeholder="Email*" />
            </div>
            <div>
                <label>Mot de passe:</label>
                <input type="password" name="password" placeholder="Mot de passe*" />
            </div>
            <button type="submit">Soumission</button>
            <div className={`state-${answer.state}`}>
                <p className={`btn-auth btn answer-${answer.color}`}>{answer.msg}</p>
            </div>
        </form>

    );
}