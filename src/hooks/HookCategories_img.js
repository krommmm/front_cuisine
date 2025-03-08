import entrée from "../assets/pictures/categories/category/entry.jpg";
import plat from "../assets/pictures/categories/category/plat.jpg";
import dessert from "../assets/pictures/categories/category/dessert.jpg";
import apero from "../assets/pictures/categories/category/apero.jpg";
import boisson from "../assets/pictures/categories/category/boisson.jpg";
import petit_dejeuner from "../assets/pictures/categories/category/petit_dejeuner.webp";
import sans_gluten from "../assets/pictures/categories/tags/sans_gluten.jpg";
import diet from "../assets/pictures/categories/tags/diet.png";
import sans_lactose from "../assets/pictures/categories/tags/sans_lactose.jpg";
import rapide from "../assets/pictures/categories/tags/rapide.jpg";
import printemps from "../assets/pictures/categories/tags/printemps.jpg";
import été from "../assets/pictures/categories/tags/été.jpg";
import automne from "../assets/pictures/categories/tags/automne.jpg";
import hiver from "../assets/pictures/categories/tags/hiver.jpg";
import four from "../assets/pictures/categories/tags/four.jpg";
import vapeur from "../assets/pictures/categories/tags/vapeur.jpg";
import poele from "../assets/pictures/categories/tags/poele.jpg";
import grille from "../assets/pictures/categories/tags/grille.jpg";
import roti from "../assets/pictures/categories/tags/roti.jpg";
import cru from "../assets/pictures/categories/tags/cru.jpg";
import mediteraneen from "../assets/pictures/categories/tags/mediteraneen.jpg";
import asiatique from "../assets/pictures/categories/tags/asiatique.png";
import italien from "../assets/pictures/categories/tags/italien.jpg";
import indien from "../assets/pictures/categories/tags/indien.jpg";


export function HookCategories_img() {

    const categories = [
        { name: "Apéro", img: apero, isCircle: false },
        { name: "Entrée", img: entrée, isCircle: false },
        { name: "Plat", img: plat, isCircle: false },
        { name: "Dessert", img: dessert, isCircle: false },
        { name: "Boisson", img: boisson, isCircle: false },
        { name: "Petit déjeuner", img: petit_dejeuner, isCircle: false }
    ];

    const cuissons = [
        { name: "Four", img: four, isCircle: true },
        { name: "Vapeur", img: vapeur, isCircle: true },
        { name: "Poele", img: poele, isCircle: true },
        { name: "Grillé", img: grille, isCircle: true },
        { name: "Roti", img: roti, isCircle: true },
        { name: "Cru", img: cru, isCircle: true },
    ];

    const saisons = [
        { name: "Printemps", img: printemps, isCircle: true },
        { name: "Eté", img: été, isCircle: true },
        { name: "Automne", img: automne, isCircle: true },
        { name: "Hiver", img: hiver, isCircle: true }
    ];


    const tags = [
        { name: "Sans gluten", img: sans_gluten, isCircle: true },
        { name: "Diet", img: diet, isCircle: true },
        { name: "Sans lactose", img: sans_lactose, isCircle: true },
        { name: "Rapide", img: rapide, isCircle: true },


    ];

    const gastronomie = [
        { name: "Méditéranéen", img: mediteraneen, isCircle: true },
        { name: "Asiatique", img: asiatique, isCircle: true },
        { name: "Italien", img: italien, isCircle: true },
        { name: "Indien", img: indien, isCircle: true }
    ];

    return { categories, cuissons, saisons, gastronomie, tags }

}