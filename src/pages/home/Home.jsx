import { RecettesHorizontal } from "../../components/common/RecettesHorizontal";
import { HookCategories_img } from "../../hooks/HookCategories_img";
import { Banner } from "../../components/common/Banner";
import { Recipes } from "../../components/common/Recipes";


export function Home() {

    const { categories, cuissons, saisons, gastronomie, tags } = HookCategories_img();

    return (
        <div className="home">
            <Banner />

            {/* 1 article de blog */}
            <Recipes />

            {/* 
              <RecettesHorizontal items={categories} name={"Recette par Categories"} />
            <RecettesHorizontal items={cuissons} name={"Recettes par cuisson"} />
            <RecettesHorizontal items={saisons} name={"Recettes par saisons"} />
            <RecettesHorizontal items={gastronomie} name={"Recettes par gastronomie"} />
            <RecettesHorizontal items={tags} name={"Recettes par tags"} /> */}
        </div>
    );
}