import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken)  return res.status(401).json({ message: "Unauthorized - No access token provided!" });

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            const customer = await Customer.findByPk(decoded.customerId, {
                attributes: {exclude: ["customer_password"]}
            });

            if(!customer){
                return res.status(401).json({message: "Customer does not exist!"});
            }

            req.customer = customer;
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Unauthorized - Access token expired"});
            }
            return res.status(401).json({ message: "Unauthorized - Invalid access token" })
        }
    } catch (error) {
        console.log("Error in authMiddleware middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
};

export const adminRoute = (req, res, next) => {
	if (req.customer && req.customer.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};