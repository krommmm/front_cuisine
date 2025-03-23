import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function MenuDeroulantMobile({ data, onUpdateLeave, parentPath = '' }) {
    const [openMenuPath, setOpenMenuPath] = useState(null);
    const { state } = useAuth();

    const handleMenuToggle = (path) => {
        setOpenMenuPath(prev => prev === path ? null : path);
    };

    // Fonction de vérification d'accès
    const isProtectedRoute = (route) => ['favoris', 'create'].includes(route);

    return (
        <>
            {data.map((cell, index) => {
                const uniquePath = `${parentPath}-${index}`;

                return (
                    <ul key={uniquePath}>
                        {cell.type === "menu" ? (
                            <li>
                                <div
                                    className="menu-header"
                                    onClick={() => handleMenuToggle(uniquePath)}
                                >
                                    <span>
                                        {cell.icon && <i className={`${cell.icon}`}></i>}
                                        <p>{cell.name}</p>
                                    </span>
                                    <i className={`fa-solid fa-angle-${openMenuPath === uniquePath ? 'down' : 'right'}`}></i>
                                </div>

                                {openMenuPath === uniquePath && (
                                    <div className="nested-menu">
                                        <MenuDeroulantMobile
                                            data={cell.children}
                                            onUpdateLeave={onUpdateLeave}
                                            parentPath={uniquePath}
                                        />
                                    </div>
                                )}
                            </li>
                        ) : (
                            // Logique de protection des routes
                            (isProtectedRoute(cell.route) ? state.isConnected : true) && (
                                <NavLink
                                    to={`/${cell.route}${cell.route === "create" ? "?form-create-etape=1&page=1" : "?page=1"}${cell.category ? `&category=${cell.category}` : ''}${cell.tag ? `&tag=${cell.tag}` : ''}`}
                                    onClick={() => {
                                        if (isProtectedRoute(cell.route) && !state.isConnected) {
                                            alert("Veuillez vous connecter pour accéder à cette section");
                                            return;
                                        }
                                        onUpdateLeave();
                                    }}
                                    style={({ isActive }) => ({
                                        pointerEvents: isProtectedRoute(cell.route) && !state.isConnected ? 'none' : 'auto',
                                        opacity: isProtectedRoute(cell.route) && !state.isConnected ? 0.5 : 1
                                    })}
                                >
                                    <li>
                                        {cell.icon && <i className={`${cell.icon}`}></i>}
                                        {cell.name || cell.route} {/* Fallback sur le nom de la route */}
                                    </li>
                                </NavLink>
                            )
                        )}
                    </ul>
                );
            })}
        </>
    );
}
