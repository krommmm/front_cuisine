import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function FormEtape1() {

    const navigate = useNavigate();
    const [answer, setAnswer] = useState({
        state: false, color: false, msg: "Veuillez remplir tous les champs"
    });


    function submitInputs(e) {
        e.preventDefault();
        // Reset des fields
        localStorage.removeItem('cuisine-form-create-etape');

        const form = e.target;
        const data = [
            { name: "name", value: form.elements.name.value || null },
            { name: "servings", value: Number(form.elements.servings.value) || null },
            { name: "cook_time", value: Number(form.elements.cook_time.value) || null },
            { name: "prep_time", value: Number(form.elements.prep_time.value) || null }
        ];

        const newData = {
            name: data[0].value,
            servings: data[1].value,
            cook_time: data[2].value,
            prep_time: data[3].value
        };
        const isAllInputsFilled = verificationFields(data);

        if (!isAllInputsFilled) {
            displayAnswer(isAllInputsFilled);
            return;
        }
        localStorage.setItem("cuisine-form-create-etape", JSON.stringify(newData));
        navigate("/create?form-create-etape=2")
    }

    function verificationFields(data) {
        return data.every((cell) => cell.value !== null);
    }

    function displayAnswer(res) {
        if (res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: true }));
        } else if (!res) {
            setTimeout(() => {
                setAnswer((prevState) => ({ ...prevState, state: false, color: true }));
            }, 2000);
            setAnswer((prevState) => ({ ...prevState, state: true, color: false }));
        }
    }

    return (
        <div className="formEtape">
            <p>Etape 1 sur 4</p>
            <h2>Completer les inputs</h2>

            <form onSubmit={(e) => submitInputs(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div>
                    <label>Nb de personnes:</label>
                    <input type="number" name="servings" placeholder="Personnes" />
                </div>
                <div>
                    <label>Temps de cuisson (min):</label>
                    <input type="number" name="cook_time" placeholder="Cuisson" />
                </div>
                <div>
                    <label>Temps de préparation (min):</label>
                    <input type="number" name="prep_time" placeholder="Preparation" />
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