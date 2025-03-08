import { Recipes } from "../../components/common/Recipes";
import { useState, useEffect } from "react";
import { getFavorites } from "../../services/favorites";
import { getRecipe } from "../../services/recipes";

export function Favorites() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        controller();
    }, []);

    async function controller() {
        const res = await getFavorites();
        const favIds = res.data.favorites;
        if (favIds.length <= 0){
            setRecipes([]);
            return;
        }
        const recipesIds = favIds.map((ids) => ids._id);

        const favoritesRecipes = (await Promise.all(
            recipesIds.map(async (recipeId) => {
                try {
                    const resFav = await getRecipe(recipeId);
                    return resFav.data.recipe || null;
                } catch (error) {
                    return null;
                }
            })
        )).filter(Boolean);
        setRecipes(favoritesRecipes);
    }

  


    return (
        <>
            {recipes && recipes.length > 0 && <Recipes recipesData={recipes} onUpdateFav={controller} />}
        </>
    );
}