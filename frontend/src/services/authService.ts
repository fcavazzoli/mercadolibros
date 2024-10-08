import { LoginCredentials } from "../types/authTypes";

export const login = async (credentials: LoginCredentials): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.username === "user" && credentials.password === "pass") {
                resolve("mocked-jwt-token");
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
};
