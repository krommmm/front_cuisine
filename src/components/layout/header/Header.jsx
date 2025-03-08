
import { Promo } from "./promo/Promo";
import { Search } from "./search/Search";
import { Navigation } from "./navigation/Navigation";
import { useState } from "react";

export function Header() {

    const [promo, setPromo] = useState("🔔 Site en construction");

    return (
        <div className="header">
            <Promo text={promo}/>
            <Search />
            <Navigation />
        </div>
    );
};