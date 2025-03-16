import { useState, useEffect, useRef } from "react";
import { getFavByUserId } from "../../services/favorites";
import { getCountOfRecipesByUserId, getMostFavRecipe } from "../../services/recipes";
import { getMyId, getProfilById, updateProfil } from "../../services/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HOST } from "../../host";


export function Profil() {

    const [isModifyMod, setIsModifyMod] = useState(false);
    const [favCount, setFavCount] = useState(0);
    const [myRecipeCount, setMyRecipeCount] = useState(0);
    const [mostFavRecipe, setMostFavRecipe] = useState({});
    const [user, setUser] = useState(null);
    const [dateData, setDateData] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // Etat pour l'aperçu de l'image
    const imgRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [myId, setMyId] = useState("");

    function toggleModify() {
        setIsModifyMod(true);
    }

    useEffect(() => {
        init();
    }, [location]);

    async function init() {
        const id = await getUserIdParam();
        setMyId(id);
        const [res1, res2, res3, res4] = await Promise.all([
            getFavByUserId(id),
            getCountOfRecipesByUserId(id),
            getMostFavRecipe(id),
            getProfilById(id),
        ]);
        const data1 = res1.data.totalFav;
        const data2 = res2.data.recipeCount;
        const data3 = res3.data.recipe;
        const data4 = res4.data.user;
        setFavCount(data1);
        setMyRecipeCount(data2);
        if (data3) setMostFavRecipe(data3);
        setUser(data4);
        const updateDateData = await updateDate(data4.date_inscription);
        setDateData(updateDateData);
    }

    async function getUserIdParam() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("userId");
    }

    async function updateDate(timeStamp) {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDay();
        return { day: day, month: month, year: year }
    }

    // Gérer le changement d'image et créer un aperçu
    function handleImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Définir l'aperçu de l'image
            };
            reader.readAsDataURL(file); // Lire le fichier comme URL
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();

        if (imgRef.current.files[0]) formData.append("img_url", imgRef.current.files[0]);
        if (form.elements["name"].value.trim() !== "") formData.append("name", form.elements["name"].value);
        if (form.elements["email"].value.trim() !== "") formData.append("email", form.elements["email"].value);
        if (form.elements["password"].value.trim() !== "") formData.append("password", form.elements["password"].value);
        if (form.elements["description"].value.trim() !== "") formData.append("description", form.elements["description"].value);

        const res = await updateProfil(formData);
        console.log(res);
        await init();
        setIsModifyMod(false);
    }

    function recettesProfil(e) {
        console.log("coucou");
        e.preventDefault();
        navigate(`/myRecipes?userId=${myId}`);
    }

    return (
        <div className="profil">
            <div className="profil__content">
                <h2>Mes données personnelles</h2>

                {user && user.email ? (
                    <div className="profil__content__data">
                        <div className="profil__content__data__header">
                            <div className="profil__content__data__header__profil">
                                {user !== null && <img src={previewImage || `${HOST}/api/images/avatars/${user.img_url}`} className="preview" />}
                                <label htmlFor="imageProfil" className="myLabel"><i className="fa-solid fa-camera" ></i></label>
                            </div>
                            <input type="file" name="img_url" id="imageProfil" onChange={handleImage} ref={imgRef} />
                            {!isModifyMod && <button className="btn btn-modifier" onClick={toggleModify}>Modifier</button>}
                        </div>

                        {isModifyMod ? (
                            <div className="profil__content__data__body">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="inputsClassiques">
                                            <div>
                                                <label>Name<span className="asterixRouge">*</span></label>
                                                <input type="text" name="name" placeholder="Nom" />
                                            </div>
                                            <div>
                                                <label>Email<span className="asterixRouge">*</span></label>
                                                <input type="email" name="email" placeholder="Email" />
                                            </div>
                                            <div>
                                                <label>Password<span className="asterixRouge">*</span></label>
                                                <input type="password" name="password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="inputText">
                                            <label>Description<span className="asterixRouge">*</span></label>
                                            <textarea type="text" name="description" placeholder="Description" ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        ) : (
                            <div className="profil__content__data__body">
                                <div>
                                    <div>
                                        <label>Name <span className="asterixRouge">*</span></label>
                                        {user !== null && <p>{user.name}</p>}
                                    </div>
                                    <div>
                                        <label>Email <span className="asterixRouge">*</span></label>
                                        {user !== null && <p>{user.email}</p>}
                                    </div>
                                    <div>
                                        <label>Password <span className="asterixRouge">*</span></label>
                                        <p>****************</p>
                                    </div>
                                </div>
                                <div className="profil__content__data__body__description">
                                    {user !== null && <p>{user.description}</p>}
                                </div>
                            </div>
                        )}
                        <div className="profil__content__data__footer">
                            {dateData !== null && <p>Date d'inscription: {`${dateData.day}-${dateData.month}-${dateData.year}`}</p>}
                            <p>{favCount} likes / {myRecipeCount} recettes</p>
                            <p>Recette la plus populaire: <NavLink to={`/focus?&recipeId=${mostFavRecipe._id}`}><span className="mostLikedRecipe">{mostFavRecipe.name}</span></NavLink> ({mostFavRecipe.favorites_count} {mostFavRecipe.favorites_count > 1 ? "likes" : "like"})</p>
                            <button className="btn btn-myRecipes" onClick={recettesProfil}>Mes recettes</button>
                        </div>
                    </div>
                ) : (
                    <div className="profil__content__data">
                        <div className="profil__content__data__header">
                            <div className="profil__content__data__header__profil">
                                {user !== null && <img src={`${HOST}/api/images/avatars/${user.img_url}`} />}
                            </div>
                        </div>

                        {isModifyMod ? (
                            <div className="profil__content__data__body">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="inputsClassiques">
                                            <div>
                                                <label>Name<span className="asterixRouge">*</span></label>
                                                <input type="text" name="name" placeholder="Nom" />
                                            </div>
                                            <div>
                                                <label>Email<span className="asterixRouge">*</span></label>
                                                <input type="email" name="email" placeholder="Email" />
                                            </div>
                                            <div>
                                                <label>Password<span className="asterixRouge">*</span></label>
                                                <input type="password" name="password" placeholder="Password" />
                                            </div>
                                        </div>
                                        <div className="inputText">
                                            <label>Description<span className="asterixRouge">*</span></label>
                                            <textarea type="text" name="description" placeholder="Description" ></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        ) : (
                            <div className="profil__content__data__body">
                                <div>
                                    <div>
                                        <label>Name <span className="asterixRouge">*</span></label>
                                        {user !== null && <p>{user.name}</p>}
                                    </div>


                                </div>
                                <div className="profil__content__data__body__description">
                                    {user !== null && <p>{user.description}</p>}
                                </div>
                            </div>
                        )}
                        <div className="profil__content__data__footer">
                            {dateData !== null && <p>Date d'inscription: {`${dateData.day}-${dateData.month}-${dateData.year}`}</p>}
                            <p>{favCount} likes / {myRecipeCount} recettes</p>
                            <p>Recette la plus populaire: <NavLink to={`/focus?&recipeId=${mostFavRecipe._id}`}><span className="mostLikedRecipe">{mostFavRecipe.name}</span></NavLink> ({mostFavRecipe.favorites_count} {mostFavRecipe.favorites_count > 1 ? "likes" : "like"})</p>
                            <button className="btn btn-myRecipes" onClick={recettesProfil}>Mes recettes</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
