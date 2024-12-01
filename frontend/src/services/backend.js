export class Backend {
    constructor() {
        if (Backend.instance) {
            return Backend.instance;
        }
        this.backendUrl = 'http://localhost:3000/api';
        Backend.instance = this;
    }

    async #fetchRequest(endpoint, options = {}) {
        const response = await fetch(`${this.backendUrl}${endpoint}`, options);
        return response.json();
    }

    async get(endpoint, headers = {}) {
        headers['authorization'] = 'bearer ' + localStorage.getItem('sessionToken');
        return this.#fetchRequest(endpoint, { headers });
    }

    async post(endpoint, body = {}, headers = {}) {
        headers['authorization'] = 'bearer ' + localStorage.getItem('sessionToken');
        return this.#fetchRequest(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
    }

    async patch(endpoint, body = {}, headers = {}) {
        headers['authorization'] = 'bearer ' + localStorage.getItem('sessionToken');
        return this.#fetchRequest(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
    }

    async delete(endpoint, body = {}, headers = {}) {
        headers['authorization'] = 'bearer ' + localStorage.getItem('sessionToken');
        return this.#fetchRequest(endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
    }
}