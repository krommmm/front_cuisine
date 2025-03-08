import { useState, useEffect } from "react";
import { getRecipes } from "../../services/recipes";
import { usePagination } from "../../hooks/usePagination";
import { Recipe } from "../common/Recipe";
import { getFavorites } from "../../services/favorites";
import { useLocation } from "react-router-dom";
import { Page } from "./Page";
import { isUserConnected } from "../../services/auth";

export function Recipes({ recipesData, onUpdateFav }) {

    const [recipes, setRecipes] = useState([]);
    const pagination = usePagination(recipes);
    const [parmUrl, setParamUrl] = useState({});
    const location = useLocation();


    useEffect(() => {
        controllerRecipes();
    }, [location.search, recipesData]);


    async function controllerRecipes() {
        const resRecipes = await getRecipes();
        let myRecipes = recipesData || resRecipes.data.recipes;

        const urlParamsData = getUrlParams();
        setParamUrl(urlParamsData);
        const recipesParamsClean = avecOuSansParams(urlParamsData, myRecipes);
        const recipesAndFavorites = await addFavoritesToData(recipesParamsClean, recipesParamsClean);

        setRecipes(recipesAndFavorites);
    }

    async function addFavoritesToData(internRecipes, recipes) {
        const isUser = await isUserConnected();
        if (!isUser.data.isUser) return recipes;
        const favRes = await getFavorites();
        const favorites = favRes.data.favorites;
        const favoritesIds = [];
        favorites.forEach((favorite) => favoritesIds.push(favorite._id));

        return internRecipes.map((recipe) => {
            if (favoritesIds.includes(recipe._id)) {
                recipe.fav = true;
                return recipe;
            } else {
                recipe.fav = false;
                return recipe;
            }
        });
    }

    function avecOuSansParams(data, myRecipes) {
        // S'il n'y a pas de params
        if (data.category === null && data.tag === null) {
            // on prend tous les articles
            return myRecipes;
        } else {
            const recipesFilteredByCategory = filterRecipes(data, myRecipes);
            return recipesFilteredByCategory;
        }
    }

    function filterRecipes(paramsData, myRecipes) {
        const categories = [paramsData.category, paramsData.tag];
        const recipesArr = [];
        myRecipes.forEach((recipe) => {
            if (categories.includes(recipe.category) && !recipesArr.some((cell) => cell._id === recipe._id)) {
                recipesArr.push(recipe);
            }
            recipe.tags.forEach((tag) => {
                if (categories.includes(tag.tag) && !recipesArr.some((cell) => cell._id === recipe._id)) {
                    recipesArr.push(recipe);
                }
            })
        });

        return recipesArr;

    }

    function getUrlParams() {
        const str = window.location.href;
        const url = new URL(str);
        return {
            page: url.searchParams.get("page") || 1,
            category: url.searchParams.get("category") || null,
            tag: url.searchParams.get("tag") || null
        }
    }

    return (
        <div className="recipePage">
            {/* <div className="miniBanner">
                
            </div> */}
            <div className="recipes__legend">
                <div className="recipes__legend__tags">
                    <div className="btn">{parmUrl.category ? (parmUrl.category) : ("toutes les catégories")}</div>
                    <div className="btn">{parmUrl.tag ? (parmUrl.tag) : ("toutes les tags")}</div>
                </div>

                <div className="recipes__legend_difficulty__container">
                    <p>Difficulté: </p>
                    <div className="recipes__legend__difficulty">
                        <div className="recipes__legend__difficulty--facile"></div>
                        <div className="recipes__legend__difficulty--moyen"></div>
                        <div className="recipes__legend__difficulty--difficile"></div>
                    </div>
                </div>
            </div>

            <div className="recipes">
                {pagination.filterArticleByPage.map((recipe, index) => (
                    <div key={index}>
                        {/* Si recipes recoit déjà des recettes en props */}
                        < Recipe recipe={recipe} onUpdate={onUpdateFav || controllerRecipes} />
                    </div>
                ))
                }

            </div >
            <div className="recipePage__content__pagination">
                <div className="recipePage__content__pagination__left pageCube">
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="recipePage__content__pagination__pages">
                    <Page pageInfo={pagination} category={parmUrl.category} />
                </div>
                <div className="recipePage__content__pagination__right pageCube">
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>
    );
}