import { Lister } from "../../../components/common/Lister";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../../services/recipes";

export function FormEtape4() {

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();


    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Recette créée"
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const prevData = JSON.parse(localStorage.getItem("cuisine-form-create-etape"));
        const data = { ...prevData };
        const form = e.target;
        const formData = new FormData(form);
        if (!form.elements["img_url"].files[0]) return;

        const keys = Object.keys(data);

        // Transfert de l'objet dans le formData et stringifycation des tableaux
        for (let i = 0; i < keys.length; i++) {
            if (typeof data[keys[i]] === "string" || typeof data[keys[i]] === "number") {
                formData.append(keys[i], data[keys[i]]);
            } else {
                formData.append(keys[i], JSON.stringify(data[keys[i]]));
            }
        }

        const res = await createRecipe(formData);
        displayAnswer(res);
    };

    function displayAnswer(res) {
        if (res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Recette créée" }));
                localStorage.removeItem("cuisine-form-create-etape");
                navigate("/");
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true, msg: "Recette créée" }));
        } else if (!res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true, msg: "Recette créée" }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false, msg: "Impossible de créer la recette" }));
        }
    }


    return (
        <div className="formEtape">
            <p>Etape 4 sur 4</p>
            <h2>Ajouter une image</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Image</label>
                    <input type="file" name="img_url" />
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