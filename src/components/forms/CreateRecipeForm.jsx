import { useState, useEffect } from "react";
import { Lister } from "../common/Lister";
import { createRecipe } from "../../services/recipes";
import { useLocation } from "react-router-dom";
import { FormEtape1 } from "../../pages/create/formEtapes/FormEtape1";
import { FormEtape2 } from "../../pages/create/formEtapes/FormEtape2";
import { FormEtape3 } from "../../pages/create/formEtapes/FormEtape3";
import { FormEtape4 } from "../../pages/create/formEtapes/FormEtape4";

export function CreateRecipeForm() {
    

    const [etape, setEtape] = useState(1);
    const location = useLocation();

    useEffect(() => {
        setEtape(getEtapeUrlParam());
    }, [location.search]);

    function getEtapeUrlParam() {
        const str = window.location.href;
        const url = new URL(str);
        return Number(url.searchParams.get("form-create-etape"));
    }

    return (
        <>
            {etape === 1 && <FormEtape1 />}
            {etape === 2 && <FormEtape2 />}
            {etape === 3 && <FormEtape3 />}
            {etape === 4 && <FormEtape4 />}
        </>
    );
}