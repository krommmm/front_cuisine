import { getRecipe, createTag, updateRecipe, updateTag, deleteAllTagsFromARecipe } from "../../../services/recipes";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lister } from "../../common/Lister";

export function CategoryUpdateForm() {

    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Recette créée"
    });
    const [bddTags, setBddTags] = useState([]);

    useEffect(() => {
        controller();
    }, []);

    async function controller() {
        const recipeId = getRecipeId();
        const recipeRes = await getRecipe(recipeId);
        const tags = recipeRes.data.recipe.tags;
        setBddTags(tags);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const recipeId = getRecipeId();
        const form = e.target;

        // update categories:
        const formData = new FormData();
        formData.append('category', form.elements['category'].value);
        formData.append('difficulty', form.elements['difficulty'].value);
        await updateRecipe(recipeId, formData);

        // tags:
        const region = form.elements['regions'].value;
        const cuisson = form.elements['cuisson'].value;
        const saison = form.elements['saisons'].value;

        const tagsData = [...tags];
        tagsData.push({ tag: region });
        tagsData.push({ tag: cuisson });
        tagsData.push({ tag: saison });


        // delete all tags
        await deleteAllTagsFromARecipe(recipeId);

        // create tags

        const res = await Promise.all(tagsData.map(tag => createTag(recipeId, tag)));
        const isPromised = res.every((cell) => cell.ok);
        displayAnswer(isPromised);

    };

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

    function displayAnswer(res) {
        if (res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Catégories modifiées" }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true, msg: "Catégories modifiées" }));
        } else if (!res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Catégories modifiées" }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false, msg: "Impossible de modifier les categories" }));
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
                <h2>Modifier les categories</h2>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="divSelect">
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
                <div className="divSelect">
                    <label htmlFor="difficulty">Difficulté</label>
                    <select id="difficulty" name="difficulty">
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                    </select>
                </div>
                <div className="divSelect">
                    <label htmlFor="regions">Régions</label>
                    <select id="regions" name="regions">
                        <option value="méditéranéenne">méditéranéenne</option>
                        <option value="asiatique">asiatique</option>
                        <option value="italienne">italienne</option>
                        <option value="indienne">indienne</option>
                    </select>
                </div>
                <div className="divSelect">
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
                <div className="divSelect">
                    <label htmlFor="saisons">Saisons</label>
                    <select id="saisons" name="saisons">
                        <option value="printemps">printemps</option>
                        <option value="été">été</option>
                        <option value="automne">automne</option>
                        <option value="hiver">hiver</option>
                    </select>
                </div>
                <Lister onUpdate={setTags} name={"Tag"} />
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