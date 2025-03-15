import { useNavigate } from "react-router-dom";

export function SearchBar() {

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const query = form.elements['searchBar'].value;
        form.reset();
        navigate(`/recipesBySearch?query=${query}`);
    }


    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchBar" placeholder="Rechercher une recette, un theme, une catégorie ou un ingredient" />
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}