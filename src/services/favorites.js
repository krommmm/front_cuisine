import { HOST } from "../host";

export async function getFavorites() {
    try {
        const preRes = await fetch(`${HOST}/api/favorites`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
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


export async function toggleFavorites(recipeId) {
    try {
        const preRes = await fetch(`${HOST}/api/favorites/${recipeId}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
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

export async function getFavByUserId(userId) {
    try {
        const preRes = await fetch(`${HOST}/api/favorites/getFavByUserId/${userId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
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
