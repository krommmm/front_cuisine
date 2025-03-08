import { SousMenuDeroulant } from "./SousMenuDeroulant";
import { NavLink } from "react-router-dom";

export function MenuDeroulant({ data }) {

    return (

        <div className="menuDeroulant">
            <ul>
                {data.map((menu, index) => (
                    < div key={index}>
                        {menu.children ? (<li key={index}>{menu.name} {menu.children &&
                            (<i className="fa-solid fa-angle-right"></i>)}<SousMenuDeroulant data={menu.children} arr={menu} /></li>)
                            :
                            (<NavLink to={`/${menu.route}?page=1&category=${menu.nameUrl}`}><li key={index}>{menu.name} {menu.children && (<i className="fa-solid fa-angle-right"></i>)}</li></NavLink>)}
                    </div>

                ))}
            </ul>
        </div>
    );
} 