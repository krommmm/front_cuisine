import { HOST } from "../host";

export async function signUp(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/signup`, {
            method: "POST",
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

export async function logIn(data) {
    console.log(data);
    try {
        const preRes = await fetch(`${HOST}/api/auth/logIn`, {
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

export async function isAdmin() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isAdmin`, {
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

export async function isUserConnected() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/isUserConnected`, {
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



export async function shutDown() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/shutDown`, {
            method: "DELETE",
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


export async function getUsers() {
    try {
        const preRes = await fetch(`${HOST}/api/auth`, {
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

export async function getMyProfil() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getMyProfil`, {
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

export async function getMyId() {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getMyId`, {
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

export async function updateProfil(data) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/updateProfil`, {
            method: "PUT",
            credentials: 'include',
            headers: {
    
            }, body: data,
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

export async function getProfilById(userId) {
    try {
        const preRes = await fetch(`${HOST}/api/auth/getProfilById/${userId}`, {
            method: "GET",
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