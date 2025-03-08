export function SearchBar() {


    return (
        <div className="searchBar">
            <form>
                <input type="text" name="searchBar" placeholder="Rechercher une recette, un theme, une catégorie ou un ingredient" />
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}