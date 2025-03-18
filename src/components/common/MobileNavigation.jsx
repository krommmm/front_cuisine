import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { menuNavigationMobile } from "../../data/MenuMobile";
import { MenuDeroulantMobile } from "../common/MenuDeroulantMobile";

export function MobileNavigation() {

  const { state, dispatch } = useAuth();


  function leaveNav() {
    setTimeout(() => {
      dispatch({ type: "SET_MOBILE", payload: false });
    }, 100);
  }

  return (
    <div className="MobileNavigation">
      <div className="MobileNavigation__header"><i className="fa-solid fa-xmark" onClick={(e) => leaveNav(e)}></i></div>
      <div className="MobileNavigation__body">
        <MenuDeroulantMobile data={menuNavigationMobile} onUpdateLeave={leaveNav} />
      </div>
    </div>
  );

}