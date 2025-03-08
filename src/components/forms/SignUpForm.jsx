import { signUp } from "../../services/auth";
import { useState, useEffect } from "react";
import { PasswordVerification } from "../common/PasswordVerification";

export function SignUpForm() {

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: ""
    });
    const [password, setPassword ] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const res = await signUp(formData);
        displayAnswer(res);
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

    function handleChange(e){
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
    }

    useEffect(()=>{

    },[])

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {console.log(answer)}
            <div>
                <label>Nom:</label>
                <input type="text" name="name" placeholder="Name*" />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" placeholder="Email*" />
            </div>
            <div>
                <label >Mot de passe: <span className="pwd_indications">(1maj 1min 1charSpe 1nb 12chars noSpace)</span></label>
                <div className="signUp__passwordContainer"><input type="password" name="password" placeholder="Mot de passe*" onChange={(e)=>handleChange(e)}/> <PasswordVerification inputPassword={password}/></div>
            </div>
            <div>
                <label>Clef secrète:</label>
                <input type="password" name="magicWord" placeholder="Clef secrète*" />
            </div>

            <button type="submit">Soumission</button>
            <div className={`state-${answer.state}`}>
                <p className={`btn-auth btn answer-${answer.color}`}>{answer.msg}</p>
            </div>
        </form>
    );
}