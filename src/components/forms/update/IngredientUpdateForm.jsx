
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lister } from "../../common/Lister";
import { getRecipe, deleteAllIngredientsFromARecipe, deleteAllStepsFromARecipe, createIngredient, createStep } from "../../../services/recipes";

export function IngredientUpdateForm() {

    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate();

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Recette créée"
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const recipeId = getRecipeId();
        const recipeRes = await getRecipe(recipeId);
        const recipe = recipeRes.data.recipe;

        // Suppression des ingredients:
        if (recipe.ingredients && recipe.ingredients.length > 0) {
            await deleteAllIngredientsFromARecipe(recipeId);
        }

        // Suppression des steps:
        if (recipe.steps && recipe.steps.length > 0) {
            await deleteAllStepsFromARecipe(recipeId);
        }

        // Création des ingrédients & steps:
        const ingreRes = await Promise.all(ingredients.map((ingredient) => createIngredient(recipeId, ingredient)));
        const stepsRes = await Promise.all(steps.map((step) => createStep(recipeId, step)));


        // Affichage de la réponse si tout se passe bien
        const isIngreRes = ingreRes.every((item) => item.ok);
        const isStepsRes = stepsRes.every((item) => item.ok);
        if (isIngreRes && isStepsRes) {
            displayAnswer(true);
        } else {
            displayAnswer(false);
        }
    };

    function displayAnswer(res) {
        if (res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Recette modifiée" }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true, msg: "Recette modifiée" }));
        } else if (!res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Recette modifiée" }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false, msg: "Impossible de modifier la recette" }));
        }
    }

    function getRecipeId() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("recipeId")
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

    function handleReturn(e) {
        e.preventDefault();
        const params = getUrlParams();
        navigate(`/focus?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}`);
    }

    return (
        <div className="formEtape">
            <div className="formEtage__header">
                <div className="formEtage__header__previousPage" onClick={(e) => handleReturn(e)}><i className="fa-solid fa-arrow-left"></i></div>
                <h2>Modifier Ingrédients & Etapes</h2>
            </div>



            <form onSubmit={(e) => handleSubmit(e)}>

                <Lister onUpdate={setIngredients} name={"Ingrédient"} />
                <Lister onUpdate={setSteps} name={"Step"} />
                <div className="answerButtons">
                    <button type="submit" className="btn btn-suivant">Modifier</button>
                    <div className={`state-${answer.state}`}>
                        <p className={`btn  answer-${answer.color}`}>{answer.msg}</p>
                    </div>
                </div>
            </form>
        </div>
    );
}