import { useState, useEffect } from "react";
import { getRecipesByResearch } from "../../services/recipes";
import { useLocation } from "react-router-dom";
import { Recipes } from "../../components/common/Recipes";

export function RecipesBySearch() {

    const location = useLocation();
    const [recipesSearched, setRecipesSearched] = useState([]);

    useEffect(() => {
        init();
    }, [location]);

    async function init() {
        const query = await getUrlParam();
        const res = await getRecipesByResearch(query);
         if(res.data.recipes.length>0) setRecipesSearched(res.data.recipes);
    }

    async function getUrlParam() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("query");
    }

    return (
        <div className="recipesBySearch">
            <p>Recipes by search</p>
            {console.log(recipesSearched)}
            <Recipes recipesData={recipesSearched}/>
        </div>
    );
}