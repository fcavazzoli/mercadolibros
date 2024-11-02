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

    async get(endpoint) {
        return this.#fetchRequest(endpoint);
    }

    async post(endpoint, body = {}, headers = {}) {
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
        return this.#fetchRequest(endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
    }
}