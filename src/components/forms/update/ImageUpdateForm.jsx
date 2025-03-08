import { updateRecipe } from "../../../services/recipes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ImageUpdateForm() {
    
    const navigate = useNavigate();


    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Recette créée"
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const recipeId = getRecipeId();
        const res = await updateRecipe(recipeId, formData);
        displayAnswer(res);
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
                <h2>Modifier la recette</h2>
            </div>

       

            <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    <label>Nb de personnes:</label>
                    <input type="number" name="servings" placeholder="Personnes" />
                </div>
                <div>
                    <label>Temps de cuisson (min):</label>
                    <input type="number" name="cook_time" placeholder="Cuisson" />
                </div>
                <div>
                    <label>Temps de préparation (min):</label>
                    <input type="number" name="prep_time" placeholder="Preparation" />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" name="img_url" />
                </div>
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