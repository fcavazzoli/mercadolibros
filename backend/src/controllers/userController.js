import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { dbCreateUser, getUserByEmail, getUserById, updateUser } from "../services/prisma/users.js";

export const getUser = async (req, res) => {
    const { userId } = req.params;
    console.log("getUser request: " + userId);

    const user = await getUserById(Number(userId));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
        message: "User fetched successfully",
        user: userWithoutPassword
    });
};

export const createUser = async (req, res) => {
    const { email, password, name, address, phoneNumber } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "Email and password are required"
        });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await dbCreateUser({ email, password: hashedPassword, name, address, phoneNumber });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).send({
            message: "User created successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send({
            message: "Error creating user",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request: email(" + email + ") password(" + password + ")");

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            console.log("authorisation: " + req.headers.authorization)
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            message: "Current user fetched successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.error("Get current user error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUserInfo = async (req, res) => {
    const { user } = req;
    const  userInfo  = req.body;
    const { password, ...updatedInfo } = await updateUser(user.id, userInfo)

    return res.status(200).json({ message: updatedInfo })
}