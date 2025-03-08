import { Lister } from "../../../components/common/Lister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormEtape3() {

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Veuillez remplir tous les champs"
    });

    function handleSubmit(e) {
        e.preventDefault();
        const prevData = JSON.parse(localStorage.getItem("cuisine-form-create-etape"));
        const data = { ...prevData };
        data.ingredients = ingredients;
        data.steps = steps;
        tags.forEach((tag) => data.tags.push(tag));


        localStorage.setItem("cuisine-form-create-etape", JSON.stringify(data));
        navigate("/create?form-create-etape=4");

    }

    return (
        <div className="formEtape">
            <p>Etape 3 sur 4</p>
            <h2>Completer les tags</h2>


            <div className="createRecipeForm__right">
                <Lister onUpdate={setIngredients} name={"Ingrédient"} />
                <Lister onUpdate={setSteps} name={"Step"} />
                <Lister onUpdate={setTags} name={"Tag"} />
            </div>
            <div className="answerButtons">
                <button type="submit" className="btn btn-suivant" onClick={(e) => handleSubmit(e)}>Suivant</button>
                <div className={`state-${answer.state}`}>
                    <p className={`btn  answer-${answer.color}`}>{answer.msg}</p>
                </div>
            </div>
        </div>
    );
}