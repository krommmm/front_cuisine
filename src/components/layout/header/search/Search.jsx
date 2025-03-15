
import { SearchBar } from "./SearchBar";
import logo from "../../../../assets/pictures/logo/logo.png";
import { NavLink } from "react-router-dom";
import power from "../../../../assets/pictures/icones/power.png";
import { shutDown, getMyId } from "../../../../services/auth";
import { useAuth } from "../../../../contexts/AuthContext";
import { useState, useEffect } from "react";

export function Search() {

    const { state, dispatch } = useAuth();
    const [myId, setMyId] = useState(null);

    useEffect(()=>{
        async function init(){
            const res = await getMyId();
            const id = res.data.userId;
            setMyId(id);
        }
        init();
    },[]);

    async function shutDownAuth(e) {
        e.preventDefault();
        await shutDown();
        dispatch({ type: "LOGOUT" });
    }

    function toogleNavigation() {
        dispatch({ type: "SET_MOBILE", payload: !state.isMobile });
    }

    return (
        <div className="search">
            <div className="search__content">
                <div className="search__logo">
                    <img src={logo} />
                    <p>Cuisine</p>
                    <div className="searchBar__miniNavigation" onClick={(e) => toogleNavigation(e)}>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                <SearchBar />
                <div className="search__auth">
                  {state.isConnected && <NavLink to={`/profil?userId=${myId}`}><button className="btn search__auth--profil">Profil</button></NavLink> }
                    <NavLink to="/auth"><button className="btn search__auth--auth">Auth</button></NavLink>
                    <img src={power} onClick={(e) => shutDownAuth(e)} />
                </div>
            </div>
        </div>
    );
}