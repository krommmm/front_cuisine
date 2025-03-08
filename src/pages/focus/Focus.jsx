import { useState, useEffect } from "react";
import { getRecipe, deleteRecipe } from "../../services/recipes";
import { getFavorites } from "../../services/favorites";
import { HOST } from "../../host";
import oven from "../../assets/pictures/icones/oven.png";
import chef from "../../assets/pictures/icones/chef.png";
import stopwatch from "../../assets/pictures/icones/stopwatch.png";
import difficulty from "../../assets/pictures/icones/difficulty.png";
import { toggleFavorites } from "../../services/favorites";
import { FocusRight } from "./FocusRight";
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { updateRecipe } from "../../services/recipes";

export function Focus() {

    const [recipe, setRecipe] = useState([]);
    const navigate = useNavigate();
    const { state, dispatch } = useAuth();
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        controller();
    }, []);

    async function controller() {
        const recipeRe = await getOneRecipe();
        const recipeWidhtFavorites = await addFavoritesToData(recipeRe);
        setRecipe(recipeWidhtFavorites);
    }

    async function getOneRecipe() {
        const recipeId = getRecipeIdUrlParms();
        const res = await getRecipe(recipeId);
        return res.data.recipe;
    }

    function getRecipeIdUrlParms() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("recipeId");
    }

    async function addFavoritesToData(internRecipe) {
        let recipe1 = { ...internRecipe };
        let recipe2 = { ...internRecipe };

        const favRes = await getFavorites();
        if (!favRes.ok) return recipe2;
        const favorites = favRes.data.favorites;
        const favoritesIds = [];
        favorites.forEach((favorite) => favoritesIds.push(favorite._id));

        recipe1.fav = favoritesIds.includes(recipe1._id) ? true : false;
        return recipe1;
    }

    async function handleFavorites(e) {
        e.preventDefault();
        const recipeId = getRecipeIdUrlParms();
        await toggleFavorites(recipeId);
        controller();
    }


    function handlePdf() {
        const doc = new jsPDF();

        // Ajouter du texte dans le PDF
        doc.setFontSize(25);
        doc.text(`${recipe.name}`, 60, 30);
        const imgData = `${HOST}/api/images/recipes/${recipe.img_url}`
        doc.addImage(imgData, 'PNG', 60, 40, 80, 80);

        // Ingredients
        let hauteurDefinit = 140;
        doc.setFontSize(14);
        doc.text(`Ingrédients:`, 30, 140);
        doc.setFontSize(10);
        recipe.ingredients.forEach((ingredient) => {
            hauteurDefinit += 5;
            doc.text(`. ${ingredient.name}`, 40, hauteurDefinit);
        });

        // Etaps
        hauteurDefinit += 10;
        doc.setFontSize(14);
        doc.text(`Etapes:`, 30, hauteurDefinit);
        doc.setFontSize(10);
        recipe.steps.forEach((step) => {
            hauteurDefinit += 5;
            doc.text(`${step.step_number} ${step.step_instruction}`, 40, hauteurDefinit);
        });


        // Générer et télécharger le PDF
        doc.save(`Recette - ${recipe.name}.pdf`);
    };

    function handleReturn(e) {
        e.preventDefault();
        const urlParams = getUrlParams();
        navigate(`/recipes?page=${urlParams.page}&category=${urlParams.category}&tag=${urlParams.tag}`);
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

    async function handleDeleteRecipe(e) {
        e.preventDefault();
        const recipeId = getRecipeIdUrlParms();
        const res = await deleteRecipe(recipeId);
        navigate("/");
    }

    function handleUpdate(e) {
        e.preventDefault();

        setIsUpdate((prevState) => !prevState);
        // const params = getUrlParams();
        // redirection vers updateMenu avec tous les params 
        // navigate(`/update?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}`);
    }
    function handleUpdateImg(e) {
        const params = getUrlParams();
        navigate(`/update?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}&update=image`);
    }
    function handleUpdateCategories(e) {
        const params = getUrlParams();
        navigate(`/update?page=${params.page}&recipeId=${params.recipeId}&category=${params.category}&tag=${params.tag}&update=category`);
    }
    return (

        <div className="focus" style={{ backgroundImage: `url('${HOST}/api/images/recipes/${recipe.img_url}')` }}>

            <div className="focus__filter">
                <div className="focus__header">
                    <div className="focus__header__previousPage" onClick={(e) => handleReturn(e)}><i className="fa-solid fa-arrow-left"></i></div>
                    <p className="focus__header--title">{recipe.name}</p>
                </div>
                <div className="focus__author">
                    <p>{recipe.author}</p><img src={`${HOST}/api/images/avatars/${recipe.authorImg_url}.png`} />
                </div>

                <div className="focus__body">
                    <div className="focus__body__left">
                        <div className={`focus__body__left__img ${isUpdate && "clickable"}`} >
                            <img src={`${HOST}/api/images/recipes/${recipe.img_url}`} onClick={isUpdate ? (e) => handleUpdateImg(e) : () => console.log("")} />
                            {state.isConnected && <div className="bannerTag bannerTag--update" onClick={(e) => handleUpdate(e)}><i className="fa-regular fa-pen-to-square"></i></div>}
                            {state.isConnected && <div className="bannerTag bannerTag--update2"><i className="fa-regular fa-pen-to-square"></i></div>}
                            {state.isConnected && <div className="bannerTag bannerTag--delete" onClick={(e) => handleDeleteRecipe(e)}><i className="fa-regular fa-trash-can"></i></div>}
                            {state.isConnected && <div className="bannerTag bannerTag--delete2"><i className="fa-regular fa-trash-can"></i></div>}
                        </div>
                        <div className={`focus__body__left__console ${isUpdate && "clickable"}`} onClick={isUpdate ? (e) => handleUpdateCategories(e) : () => console.log("")}>
                            <div className={`focus__body__left__console__indications `} >
                                <ul>
                                    <li><img src={stopwatch} /><p>{recipe.prep_time} m</p></li>
                                    <div className="barVertical"></div>
                                    <li><img src={oven} /><p>{recipe.cook_time} m</p></li>
                                    <div className="barVertical"></div>
                                    <li><img src={difficulty} /><p>{recipe.difficulty}</p></li>
                                    <div className="barVertical"></div>
                                    <li><img src={chef} /><p>{recipe.category}</p></li>
                                </ul>
                            </div>
                            <div className="focus__body__left__console__buttons">
                                <div className="focus__body__left__console__buttons--fav btn" onClick={(e) => handleFavorites(e)}>{recipe.fav ? (<i className={`fa-solid fa-heart hearth--${recipe.fav}`}></i>) : (<i className={`fa-regular fa-heart hearth--${recipe.fav}`}></i>)} Ajouter aux favoris</div>
                                <div className="focus__body__left__console__buttons--pdf btn" onClick={(e) => handlePdf(e)}>Télécharger pdf</div>
                            </div>
                            <div className="focus__body__left__console__footer">

                                <div className={`focus__body__left__console__footer__tags`}>
                                    {recipe.tags && recipe.tags.map((tag, index) => (
                                        <div className="btn btn-tag" key={index}>
                                            {tag.tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="focus__body__right">
                        {recipe.ingredients && <FocusRight recipe={recipe} isUpdate={isUpdate} />}
                    </div>
                </div>

            </div>
        </div>
    );
}
