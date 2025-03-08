import bg_2 from "../../assets/pictures/bg/bg_2.jpg";
import bg_1 from "../../assets/pictures/bg/bg_1.jpg";
import bg_3 from "../../assets/pictures/bg/bg_3.jpg";

export function Banner() {

    return (

        <div className="home__banner">
            {/* <img src={bg_3} /> */}
            <div className="home__banner__annonce">
                <h1>Envie d’un plat gourmand ?</h1>
                <p>En quête d’inspiration pour régaler tout le monde ce mois-ci ? Découvrez nos recettes salées et sucrées qui ont fait fondre vos cœurs. De l’apéritif au dessert, laissez-vous guider par des idées savoureuses et gourmandes pour chaque occasion. </p>
            </div>
        </div>

    );
}