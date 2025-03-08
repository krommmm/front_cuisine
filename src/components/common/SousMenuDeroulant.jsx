import { NavLink } from "react-router-dom";

export function SousMenuDeroulant({ data, arr }) {

    return (
        <div className="sousMenuDeroulant">
            <ul>
                {data.map((sousMenu, index2) => (
                    <div className="sousMenuDeroulant__container" key={index2}>
                        {sousMenu.children ? (<li key={index2}>{sousMenu.name} {sousMenu.children &&
                            (<i className="fa-solid fa-angle-right"></i>)}</li>)
                            :
                            (<NavLink to={`/${arr.route}?page=1&${sousMenu.type}=${sousMenu.route}`}><li key={index2}>{sousMenu.name} {sousMenu.children && (<i className="fa-solid fa-angle-right"></i>)}</li></NavLink>)}
                    </div>

                ))}
            </ul>
        </div>
    );
}

