
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const authenticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "không được nhận được token" });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "token hết hạn, vui lòng đăng nhập lại", token });
        req.user = user
        next();
    });
};

