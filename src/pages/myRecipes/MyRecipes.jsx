import { useState, useEffect } from "react";
import { allMyRecipes } from "../../services/recipes";
import { Recipes } from "../../components/common/Recipes";

export function MyRecipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init() {
        const userId = getPramsId();
        const recipesRes = await allMyRecipes(userId);
        setRecipes(recipesRes.data.recipes); 
    }

    function getPramsId() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("userId");
    }

    return (
        <>
           {recipes && recipes.length>0 && <Recipes recipesData={recipes}/> }
        </>
    );
}