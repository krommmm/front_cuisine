import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

export function SearchBar() {

    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const query = form.elements['searchBar'].value;
        form.reset();
        navigate(`/recipesBySearch?query=${query}`);
    }

    function toogleNavigation() {
        dispatch({ type: "SET_MOBILE", payload: !state.isMobile });
    }

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchBar" placeholder="Rechercher une recette, un theme, une catégorie ou un ingredient" />
                {/* <button type="submit" className="btn">Submit</button> */}
                <div className="searchBar__miniNavigation" onClick={(e) => toogleNavigation(e)}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </form>
        </div>
    );
}