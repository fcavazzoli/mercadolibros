import jwt from "jsonwebtoken";

import { getUserById } from '../services/prisma/users.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await getUserById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
}
