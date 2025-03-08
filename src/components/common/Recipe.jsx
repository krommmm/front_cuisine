import { HOST } from "../../host";
import { toggleFavorites } from "../../services/favorites";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export function Recipe({ recipe, onUpdate}) {

    const [urlParams, setUrlParams] = useState({});

    useEffect(() => {
        controller();
    }, [location.search]);

    function controller() {
        const myParams = getUrlParams();
        setUrlParams(myParams);
    }

    async function handleFavorites(e) {
        e.preventDefault();
        const recipeId = e.target.closest(".recipe").dataset.id;
        await toggleFavorites(recipeId);
        await onUpdate();
    }

    function getUrlParams() {
        const str = window.location.href;
        const url = new URL(str);
        return {
            page: url.searchParams.get("page") || 1,
            category: url.searchParams.get("category") || "",
            tag: url.searchParams.get("tag") || ""
        }
    }

    return (
        <>
            <div className="recipe" data-id={recipe._id}>
                <div className="recipe__top">
                    <NavLink to={`/focus?page=1&recipeId=${recipe._id}&page=${urlParams.page}&category=${urlParams.category}&tag=${urlParams.tag}`}><img src={`${HOST}/api/images/recipes/${recipe.img_url}`} /></NavLink>
                    <div className="recipe__top__banner">
                        <p>{recipe.name}</p>


                    </div>
                </div>
                <div className="recipe__bottom">
                    <div className={`recipe__bottom--difficulty difficulty--${recipe.difficulty}`}></div>
                    <div className="recipe__bottom--category">{recipe.category}</div>
                    <div className="recipe__bottom--favorites" onClick={(e) => handleFavorites(e)}>{recipe.fav ? (<i className={`fa-solid fa-heart hearth--${recipe.fav}`}></i>) : (<i className={`fa-regular fa-heart hearth--${recipe.fav}`}></i>)} </div>
                </div>
            </div>
        </>
    );
}