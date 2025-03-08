import { useState, useEffect } from "react";
import { ImageUpdateForm } from "../../../components/forms/update/ImageUpdateForm";
import { CategoryUpdateForm } from "../../../components/forms/update/CategoryUpdateForm";
import { IngredientUpdateForm } from "../../../components/forms/update/IngredientUpdateForm";
import { useLocation } from "react-router-dom";

export function UpdateMenu() {


    const [updateParam, setUpdateParam] = useState(null);
    const location = useLocation();

    useEffect(() => {
        controller();
    }, [location.search]);

    function controller() {
        const params = getUrlParams();
        setUpdateParam(params.update);
    }

    function getUrlParams() {
        const str = window.location.href;
        const url = new URL(str);
        return {
            page: url.searchParams.get("page") || 1,
            category: url.searchParams.get("category") || "",
            tag: url.searchParams.get("tag") || "",
            recipeId: url.searchParams.get("recipeId") || null,
            update: url.searchParams.get("update") || null,
        }
    } 

    return (
        <div className="updateMenu">
            <h1>Mise à jour de la recette </h1>
            {updateParam && updateParam === "image" && <ImageUpdateForm />}
            {updateParam && updateParam === "category" && <CategoryUpdateForm />}
            {updateParam && updateParam === "ingredientTag" && <IngredientUpdateForm />}

        </div>
    );
}