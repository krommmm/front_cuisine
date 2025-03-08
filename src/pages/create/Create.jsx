import { CreateRecipeForm } from "../../components/forms/CreateRecipeForm";

export function Create(){

    return (
        <div className="createPage"> 
        <div className="createPage__content">
            <CreateRecipeForm/>
        </div>
        </div>
    );
}