import { useNavigate } from "react-router-dom";

export function FocusRight({ recipe, isUpdate }) {

    const navigate = useNavigate();

    function handleUpdateIngredients(e) {
        e.preventDefault();
        const params = getUrlParams();
        navigate(`/update?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}&update=ingredientTag`);
    }


    function getUrlParams() {
        const str = window.location.href; 
        const url = new URL(str);
        return {
            page: url.searchParams.get("page") || 1,
            category: url.searchParams.get("category") || "",
            tag: url.searchParams.get("tag") || "",
            recipeId: url.searchParams.get("recipeId") || null,
        }
    }

    return (
        <div className={`focusRight ${isUpdate && "clickable"}`} onClick={isUpdate ? (e) => handleUpdateIngredients(e) : () => console.log("")}>
            <h2>Ingrédients</h2>
            <p className="focusRight--nbPersonnes">{recipe.servings} {recipe.servings === 1 ? ` personne` : `personnes`}</p>
            <div className={`focusRight__ingredients`}>
                {recipe.ingredients.map((ingredient, index2) => (
                    <div className="focusRight__ingredients__ingredient" key={index2}>
                        <i className="fa-regular fa-square"></i>
                        <p>{ingredient.name}</p>
                    </div>
                ))}
            </div>
            <div className="focusRight__barHorizontal"></div>
            <div className="focusRight__steps">
                <h2>Etapes</h2>
                <div className={`focusRight__steps__etapes`}>
                    {recipe.steps.map((step, index3) => (
                        <div className="focusRight__steps__etapes__step" key={index3}>
                            <p><span className="focusRight__steps__etapes__step--number">{step.step_number}</span> {step.step_instruction}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}