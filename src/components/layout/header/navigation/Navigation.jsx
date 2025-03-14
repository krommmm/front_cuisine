import { NavLink } from "react-router-dom";
import { MenuDeroulant } from "../../../common/MenuDeroulant";
import { recipesMenuData } from "../../../../data/menus";
import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect } from "react";
import { isUserConnected } from "../../../../services/auth";
import { MobileNavigation } from "../../../../components/common/MobileNavigation";


export function Navigation() {

    const { state, dispatch } = useAuth();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    async function checkAuthStatus() {
        const resUser = await isUserConnected();
        if (resUser.ok && resUser.data.isUser) {
            dispatch({ type: "SET_USER", payload: true });
        } else {
            dispatch({ type: "LOGOUT" });
        }
    }

    return (
        <div className="navigation">
            <div className="navigation__content">
                <ul>
                    <NavLink to="/" className={({ isActive }) => isActive ? "menuIsActive" : ""}><li>Accueil</li></NavLink>
                    <div className="navLink"><li>Recettes</li><MenuDeroulant data={recipesMenuData} /></div>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? "menuIsActive" : ""}><li>Favoris</li></NavLink>
                    <NavLink to="/books" className={({ isActive }) => isActive ? "menuIsActive" : ""}><li>Livres</li></NavLink>
                    <NavLink to="/blog" className={({ isActive }) => isActive ? "menuIsActive" : ""}><li>Blog</li></NavLink>
                    {state.isConnected && <NavLink to="/create?form-create-etape=1" className={({ isActive }) => isActive ? "menuIsActive" : ""}><li>Create</li></NavLink>}
                </ul>
            </div>
            {state.isMobile && <MobileNavigation />}
        </div>
    );
}