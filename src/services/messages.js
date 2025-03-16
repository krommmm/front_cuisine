import { HOST } from "../host";

export async function getMessages(senderId, receiverId) {
    try {
        const preRes = await fetch(`${HOST}/api/messages/${senderId}/${receiverId}`, {
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

export async function cleanMessages(senderId, receiverId) {
    try {
        const preRes = await fetch(`${HOST}/api/messages/${senderId}/${receiverId}`, {
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