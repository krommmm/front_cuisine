import { useState } from "react";
import { Lister } from "../common/Lister";
import { createRecipe } from "../../services/recipes";

export function CreateRecipeForm() {
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        const data = getData(form);
        const recipeRes = await createRecipe(data);
        console.log(recipeRes);
        displayAnswer(recipeRes);
    }

    function displayAnswer(res) {
        if (!res.ok) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: false, msg: res.data.msg }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false, msg: res.data.msg }));
        } else if (res.ok) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: false, msg: res.data.msg }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true, msg: res.data.msg }));
        }
    }

    function getData(form) {
        const formData = new FormData(form);

        // détachement des keys au formData
        formData.delete("steps");
        formData.delete("tags");
        formData.delete("cuisson");
        formData.delete("saisons");

        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("steps", JSON.stringify(steps));

        const myTags = [...tags];

        myTags.push({ tag: form.elements["cuisson"].value });
        myTags.push({ tag: form.elements["saisons"].value });
        myTags.push({ tag: form.elements["regions"].value });

        // ratachement de la key tags au formDAta avec le contenu de l'amalgame des tags
        formData.append("tags", JSON.stringify(myTags));

        return formData;
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="createRecipeForm">
            <div>

                <div className="createRecipeForm__left">
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" placeholder="Name" />
                    </div>
                    <div>
                        <label>Nb de personnes:</label>
                        <input type="text" name="servings" placeholder="Personnes" />
                    </div>
                    <div>
                        <label>Temps de cuisson (min):</label>
                        <input type="text" name="cook_time" placeholder="Cuisson" />
                    </div>
                    <div>
                        <label>Temps de préparation (min):</label>
                        <input type="text" name="prep_time" placeholder="Preparation" />
                    </div>

                    <div>
                        <label htmlFor="category">Catégorie</label>
                        <select id="category" name="category">
                            <option value="entrée">Entrée</option>
                            <option value="plat">Plat</option>
                            <option value="dessert">Dessert</option>
                            <option value="boisson">Boisson</option>
                            <option value="apéro">Apéro</option>
                            <option value="petit-dejeuner">Petit-déjeuner</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficulty">Difficulté</label>
                        <select id="difficulty" name="difficulty">
                            <option value="facile">Facile</option>
                            <option value="moyen">Moyen</option>
                            <option value="difficile">Difficile</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="regions">Régions</label>
                        <select id="regions" name="regions">
                            <option value="méditéranéenne">méditéranéenne</option>
                            <option value="asiatique">asiatique</option>
                            <option value="italienne">italienne</option>
                            <option value="indienne">indienne</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cuisson">Cuisson</label>
                        <select id="cuisson" name="cuisson">
                            <option value="four">four</option>
                            <option value="casserole">casserole</option>
                            <option value="vapeur">vapeur</option>
                            <option value="poele">poele</option>
                            <option value="grillé">grillé</option>
                            <option value="roti">roti</option>
                            <option value="cru">cru</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="saisons">Saisons</label>
                        <select id="saisons" name="saisons">
                            <option value="printemps">printemps</option>
                            <option value="été">été</option>
                            <option value="automne">automne</option>
                            <option value="hiver">hiver</option>
                        </select>
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" name="img_url" />
                    </div>
                </div>
                <div className="createRecipeForm__right">
                    <Lister onUpdate={setIngredients} name={"Ingrédient"} color={"pink"} />
                    <Lister onUpdate={setSteps} name={"Step"} color={"blue"} />
                    <Lister onUpdate={setTags} name={"Tag"} color={"green"} />
                </div>
            </div>
            <div className="createRecipeForm__footer">
                <button type="submit" className="btn">Soumettre</button>
                <div className={`state-${answer.state}`}>
                    <p className={`btn-create btn answer-${answer.color}`}>{answer.msg}</p>
                </div>
            </div>


        </form>
    );
}