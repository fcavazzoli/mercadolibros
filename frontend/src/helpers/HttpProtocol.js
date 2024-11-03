var source = "";

export function setServerSource(urlbase) {
    source = urlbase;
};

export async function post(url, body) {
    var call = newCall({
        method: "POST",
        body: JSON.stringify(body)
    });

    return await makeCall(url, call);
};

export async function get(url, body) {
    var call = newCall({
        method: "GET"
    });

    return await makeCall(url, call);
};



function newCall(values) {
    return {
        ...values,
        headers: { "Content-Type": "application/json" }
    }
}

async function makeCall(url, call) {
    const token = localStorage.getItem('sessionToken');
    if (token) call.headers.authorization = "token " + token;
    const response = await fetch(source + url, call);

    if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
    }

    return await response.json();
}