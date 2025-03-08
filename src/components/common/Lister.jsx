import { useState, useRef, useEffect } from "react";

export function Lister({ onUpdate, name }) {

    const [things, setThings] = useState([]);
    const thingsInputRef = useRef(null);
    const selectRef = useRef(null);

    useEffect(() => {
        onUpdate(things);
    }, [things]);

    function addThing(e) {
        e.preventDefault();

        if (!e.target.previousElementSibling.value) return;

        switch (name) {
            case "Ingrédient":
                setThings([...things, { name: thingsInputRef.current.value }]);
                thingsInputRef.current.value = "";
                break;
            case "Step":
                {
                    // recalculer l'index pour tous
                    let text = thingsInputRef.current.value;
                    const index = things.length + 1;
                    setThings([...things, { step_instruction: text, step_number: index }]);
                    thingsInputRef.current.value = "";
                    break;
                }
            case "Tag":
                if (things.some((item) => item.tag === selectRef.current.value)) {
                    return;
                }
                setThings([...things, { tag: selectRef.current.value }]);
                break;

            default: console.log("error");
        }

    }

    function recalculateIndexes(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].step_number = i + 1;
        }
        return arr;
    }


    function deleteThing(e) {
        e.preventDefault();
        const ingredient = e.target.closest(".ingredients__body__ingredient");
        const ingredientsCollection = (e.target.closest(".ingredients__body")).children;
        const myIndex = Array.from(ingredientsCollection).findIndex((elem) => elem === ingredient);
        const ingredientsArr = things.filter((ingredient, index,) => index !== myIndex);
        const recalculatedArr = recalculateIndexes(ingredientsArr);
        setThings(recalculatedArr);
    }

    return (
        <div className="ingredients">
            <div className="ingredients__header">
                {name === 'Tag' ? (
                    <div className="selectIngredients">
                        <label>{name}s:</label>
                        <div>
                            <select ref={selectRef} >
                                <option value="sans_gluten">Sans gluten</option>
                                <option value="diet">Diet</option>
                                <option value="sans_lactose">Sans lactose</option>
                                <option value="rapide">Rapide</option>
                            </select>
                            <button type="button" className="btn btn-createTags" onClick={(e) => addThing(e)}>Ajouter {name}</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <label>{name}s:</label>
                        <div>
                            <input type="text" placeholder={name} ref={thingsInputRef} />
                            <button type="button" className="btn btn-createTags" onClick={(e) => addThing(e)}>Ajouter {name}</button>
                        </div>


                    </div>
                )}

            </div>

            <div className={`ingredients__body ingredient__body--${things.length <= 0 ? "false" : "true"}`}>
                {things.map((myThing, index) => (
                    <div className="ingredients__body__ingredient" key={index}><i className="fa-regular fa-trash-can" onClick={(e) => deleteThing(e)}></i><p >
                        {name === 'Tag' && myThing.tag}
                        {name === 'Ingrédient' && myThing.name}
                        {name === 'Step' && (`${myThing.step_number} ${myThing.step_instruction} `)}
                    </p></div>
                ))}
            </div>
        </div>
    );
}