import { useState } from "react";
import { SignUpForm } from "../../components/forms/SignUpForm";
import { LogInForm } from "../../components/forms/LogInForm";

export function Auth() {

    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="auth">
            <div className="auth__selectionPage">
                <h2 className={`bgDeep-${!isLogin}`} onClick={() => setIsLogin(false)}>Inscription</h2>   <h2 className={`bgDeep-${isLogin}`} onClick={() => setIsLogin(true)}>Connexion</h2>
            </div>
            {isLogin ? (<LogInForm update={setIsLogin} />) : (<SignUpForm update={setIsLogin} />)}
        </div>
    );
}