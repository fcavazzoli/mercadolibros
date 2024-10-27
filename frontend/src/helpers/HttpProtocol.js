var source = "";

export function setServerSource(urlbase) {
    source = urlbase;
};

export async function post(url, body) {
    const response = await fetch(source + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok)
        throw new Error("Login failed");

    return await response.json();
};

export async function get(url, body) {
    const response = await fetch(source + url, {
        method: "GET"
    });

    if (!response.ok)
        throw new Error("Login failed");

    return await response.json();
};