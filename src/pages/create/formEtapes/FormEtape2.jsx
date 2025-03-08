import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function FormEtape2() {

    const navigate = useNavigate();
    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Veuillez remplir tous les champs"
    });

    function submitSelects(e) {
        e.preventDefault();
        const form = e.target;

        const prevData = JSON.parse(localStorage.getItem("cuisine-form-create-etape"));
        const data = {...prevData};
        console.log(data);
        data.category = form.elements.category.value;
        data.difficulty = form.elements.difficulty.value
        data.tags = [];
        data.tags.push({tag: form.elements.regions.value});
        data.tags.push({tag:form.elements.cuisson.value});
        data.tags.push({tag: form.elements.saisons.value});

        localStorage.setItem("cuisine-form-create-etape", JSON.stringify(data));
        navigate("/create?form-create-etape=3");
        
    }




    return (
        <div className="formEtape">
            <p>Etape 2 sur 4</p>
            <h2>Completer les catégories</h2>

            <form onSubmit={(e) => submitSelects(e)}>
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
                <div className="answerButtons">
                    <button type="submit" className="btn btn-suivant">Suivant</button>
                    <div className={`state-${answer.state}`}>
                        <p className={`btn  answer-${answer.color}`}>{answer.msg}</p>
                    </div>
                </div>
            </form>
        </div>
    );
}