export const menuNavigationMobile = [
    {
        type: "page",
        route: "",
        name: "Accueil",
        icon: "fa-solid fa-house"
    },
    {
        type: "menu",
        route: "recipes",
        name: "Recettes",
        icon: "fa-solid fa-list",
        children: [
            {
                type: "menu",
                route: "recipes",
                name: "catégories",
                children: [
                    { type: 'page', name: "entrée", category: "entrée", route: "recipes" },
                    { type: 'page', name: 'plat', category: "plat", route: "recipes" },
                    { type: 'page', name: 'dessert', category: "dessert", route: "recipes" },
                    { type: 'page', name: 'boisson', category: "boisson", route: "recipes" },
                    { type: 'page', name: 'apéro', category: "apéro", route: "recipes" },
                    { type: 'page', name: 'petit-déjeuner', category: "petit_dejeuner", route: "recipes" },
                ],
            },
            {
                type: "menu",
                route: "recipes",
                name: "cuissons",
                
                children: [
                    { type: 'tag', name: "four", tag: 'four' },
                    { type: 'tag', name: 'vapeur', tag: 'vapeur' },
                    { type: 'tag', name: 'poele', tag: 'poele' },
                    { type: 'tag', name: 'casserole', tag: 'casserole' },
                    { type: 'tag', name: 'grillé', tag: 'grillé' },
                    { type: 'tag', name: 'roti', tag: 'roti' },
                    { type: 'tag', name: 'cru', tag: 'cru' },
                ]
            },
            {
                type: "menu",
                route: "recipes",
                name: "régions",
                children: [
                    { type: 'tag', name: "méditéranéenne", route: 'méditéranéenne' },
                    { type: 'tag', name: 'asiatique', route: 'asiatique' },
                    { type: 'tag', name: 'italienne', route: 'italienne' },
                    { type: 'tag', name: 'indienne', route: 'indienne' },
                ]
            },
            {
                type: "menu",
                route: "recipes",
                name: "saisons",
                children: [
                    { type: 'tag', name: "printemps", route: 'printemps' },
                    { type: 'tag', name: 'été', route: 'été' },
                    { type: 'tag', name: 'automne', route: 'automne' },
                    { type: 'tag', name: 'hiver', route: 'hiver' },
                ]
            },
            {
                type: "menu",
                route: "recipes",
                name: "tags",
                children: [
                    { type: 'tag', name: "sans gluten", route: 'sans_gluten' },
                    { type: 'tag', name: 'diet', route: 'diet' },
                    { type: 'tag', name: 'sans lactose', route: 'sans_lactose' },
                    { type: 'tag', name: 'rapide', route: 'rapide' },
                ]
            },

        ],
    },
    {
        type: "page",
        route: "favorites",
        name: "favoris",
        icon: "fa-solid fa-heart",
    },
    {
        type: "page",
        route: "books",
        name: "page",
        icon: "fa-solid fa-book",
    },
    {
        type: "page",
        route: "blog",
        name: "blog",
        icon: "fa-solid fa-newspaper",
    },
    {
        type: "page",
        route: "create",
        name: "create",
        icon: "fa-solid fa-square-plus",
    },
];