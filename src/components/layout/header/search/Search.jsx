
import { SearchBar } from "./SearchBar";
import logo from "../../../../assets/pictures/logo/logo.png";
import { NavLink } from "react-router-dom";
import power from "../../../../assets/pictures/icones/power.png";
import { shutDown } from "../../../../services/auth";
import { useAuth } from "../../../../contexts/AuthContext";
export function Search() {

    const { state, dispatch } = useAuth();

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
                    <NavLink to="/profil"><button className="btn search__auth--profil">Profil</button></NavLink>
                    <NavLink to="/auth"><button className="btn search__auth--auth">Auth</button></NavLink>
                    <img src={power} onClick={(e) => shutDownAuth(e)} />
                </div>
            </div>
        </div>
    );
}