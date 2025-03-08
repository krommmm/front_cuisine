
export const recipesMenuData = [
    {
        type: 'folder',
        name: "toutes les recettes",
        nameUrl: "",
        route: "recipes",
    },
    {
        type: 'folder',
        nameUrl: "categories",
        name: "categories",
        route: "recipes",
        children: [
            { type: 'category', name: "entrée", route: "entrée" },
            { type: 'category', name: 'plat', route: "plat" },
            { type: 'category', name: 'dessert', route: "dessert" },
            { type: 'category', name: 'boisson', route: "boisson" },
            { type: 'category', name: 'apéro', route: "apéro" },
            { type: 'category', name: 'petit-déjeuner', route: "petit_dejeuner" },
        ],
    },
    {
        type: 'folder',
        name: "cuissons",
        route: "recipes",
        children: [
            { type: 'tag', name: "four", route: 'four' },
            { type: 'tag', name: 'vapeur', route: 'vapeur' },
            { type: 'tag', name: 'poele', route: 'poele' },
            { type: 'tag', name: 'casserole', route: 'casserole' },
            { type: 'tag', name: 'grillé', route: 'grillé' },
            { type: 'tag', name: 'roti', route: 'roti' },
            { type: 'tag', name: 'cru', route: 'cru' },
        ],
    },
    {
        type: 'folder',
        name: "Régions",
        route: "recipes",
        children: [
            { type: 'tag', name: "méditéranéenne", route: 'méditéranéenne' },
            { type: 'tag', name: 'asiatique', route: 'asiatique' },
            { type: 'tag', name: 'italienne', route: 'italienne' },
            { type: 'tag', name: 'indienne', route: 'indienne' },
        ],
    },
    {
        type: 'folder',
        name: "Saisons",
        route: "recipes",
        children: [
            { type: 'tag', name: "printemps", route: 'printemps' },
            { type: 'tag', name: 'été', route: 'été' },
            { type: 'tag', name: 'automne', route: 'automne' },
            { type: 'tag', name: 'hiver', route: 'hiver' },
        ],
    },
    {
        type: 'folder',
        name: "tags",
        route: "recipes",
        children: [
            { type: 'tag', name: "sans gluten", route: 'sans_gluten' },
            { type: 'tag', name: 'diet', route: 'diet' },
            { type: 'tag', name: 'sans lactose', route: 'sans_lactose' },
            { type: 'tag', name: 'rapide', route: 'rapide' },
        ],
    }
];