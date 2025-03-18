import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { recipesMenuData } from "../../data/menus";

export function MobileNavigation() {

  const { state, dispatch } = useAuth();


  function leaveNav(e) {
    setTimeout(() => {
      dispatch({ type: "SET_MOBILE", payload: false });
    }, 100);

  }

  return (
    <div className="MobileNavigation">
      <div className="MobileNavigation__header"><i className="fa-solid fa-xmark" onClick={(e) => leaveNav(e)}></i></div>
      <div className="MobileNavigation__body">
        <NavLink to="/" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-house"></i>
          <p>Accueil</p>
        </NavLink>
        <NavLink to="/recipes" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-list"></i>
          <p>Recettes</p>
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-heart"></i>
          <p>Favoris</p>
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-book"></i>
          <p>Livres</p>
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-newspaper"></i>
          <p>Blog</p>
        </NavLink>
        {state.isConnected && <NavLink to="/create?form-create-etape=1" className={({ isActive }) => isActive ? "mobileMenuActive" : ""} onClick={(e) => leaveNav(e)}>
          <i className="fa-solid fa-square-plus"></i>
          <p>Create</p>
        </NavLink>}
      </div>
    </div>
  );

}