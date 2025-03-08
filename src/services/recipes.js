import { HOST } from "../host";

export async function getRecipes() {
    try {
        const preRes = await fetch(`${HOST}/api/recipe`, {
            method: "GET",
            headers: {
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function getRecipe(recipeId) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}`, {
            method: "GET",
            headers: {
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function createRecipe(data) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe`, {
            method: "POST",
            credentials: 'include',
            headers: {
            },
            body: data
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}


export async function deleteRecipe(recipeId) {

    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function updateRecipe(recipeId, data) {

    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
            },
            body: data
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

// router.put("/:id/tags/:tagId"


export async function updateTag(recipeId, tagId, data) {

    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/${tagId}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
            },
            body: data
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function getTagId(recipeId, data) {
    console.log(data);

    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/getTagId`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                tag: data
            })
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function deleteAllTagsFromARecipe(recipeId) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/deleteTagsFromRecipe`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}
export async function deleteAllIngredientsFromARecipe(recipeId) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/deleteIngredientsFromRecipe`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}
export async function deleteAllStepsFromARecipe(recipeId) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/deleteStepsFromRecipe`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
            },
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function createTag(recipeId, data) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/tags`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function createIngredient(recipeId, data) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/ingredients`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}

export async function createStep(recipeId, data) {
    try {
        const preRes = await fetch(`${HOST}/api/recipe/${recipeId}/steps`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await preRes.json();
        return {
            status: preRes.status,
            ok: preRes.ok,
            data: res
        };
    } catch (err) {
        console.error(err);
    }
}
