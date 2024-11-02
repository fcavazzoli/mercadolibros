import { Backend } from './backend';

export const login = async (credentials) => {
    // credentials is { email, password }
    const backend = new Backend();
    const response = await backend.post('/users/login', credentials);

    if (response.token) {
        console.log('Login successful', response.token);
        return response.token;
    } else {
        throw new Error('Login failed');
    }
};
