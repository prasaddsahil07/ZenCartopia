import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

// Helper function to generate tokens for a given customer
export const generateTokens = (customer) => {
  const payload = { customerId: customer.customer_unique_id };
  
  // Create an access token (e.g., expires in 15 minutes)
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  
  // Create a refresh token (e.g., expires in 7 days)
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  
  return { accessToken, refreshToken };
};

// Helper function to set tokens in cookies
export const setTokensAsCookies = (res, tokens) => {
  // Set HTTP-only cookies for security
  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Auth Controller: Login endpoint
export const login = async (req, res) => {
  try {
    const { customer_unique_id, customer_password } = req.body;
    
    // Find customer by their unique id
    const customer = await Customer.findOne({
      where: { customer_unique_id },
    });
    
    if (!customer) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    
    // Compare provided password with the hashed password in database
    const isMatch = await customer.comparePassword(customer_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    
    // Generate tokens and set cookies
    const tokens = generateTokens(customer);
    setTokensAsCookies(res, tokens);
    
    return res.status(200).json({
      message: "Login successful!",
      // Optionally return the access token for client-side use,
      // but avoid sending sensitive data if not needed
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Auth Controller: Registration endpoint
export const register = async (req, res) => {
  try {
    const { customer_unique_id, customer_password, customer_name , customer_id, customer_zip_code_prefix, customer_city, customer_state, customer_profile_pic, customer_role } = req.body;
    
    if(!customer_unique_id || !customer_password || !customer_name || !customer_id){
        return res.status(401).json({message: "Fill all the required fields."});
    }

    // Check if user already exists
    const existingUser = await Customer.findOne({
      where: { customer_unique_id },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    // Create a new customer record (the beforeSave hook will hash the password)
    const customer = await Customer.create({
      customer_unique_id,
      customer_password,
      customer_name,
      customer_id,
      customer_zip_code_prefix,
      customer_city,
      customer_state,
      customer_profile_pic,
      customer_role
    });
    
    // Generate tokens and set cookies
    const tokens = generateTokens(customer);
    setTokensAsCookies(res, tokens);
    
    return res.status(201).json({
      message: "User registered successfully",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		const accessToken = jwt.sign({ customerId: decoded.customerId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 50 * 60 * 1000,
		});

		return res.json({ message: "Token refreshed successfully" });
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
		return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProfile = async (req, res) => {
	try {
		return res.json(req.customer);
	} catch (error) {
		return res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateProfile = async (req, res) => {
  const { customer_name, customer_zip_code_prefix, customer_city, customer_state, customer_profile_pic, customer_password } = req.body;
  try {
    const customer = await Customer.findByPk(req.customer.customer_unique_id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update profile fields
    if (customer_name) customer.customer_name = customer_name;
    if (customer_zip_code_prefix) customer.customer_zip_code_prefix = customer_zip_code_prefix;
    if (customer_city) customer.customer_city = customer_city;
    if (customer_state) customer.customer_state = customer_state;
    if (customer_profile_pic) customer.customer_profile_pic = customer_profile_pic;

    // Update password if provided and hashed
    if (customer_password) {
      const salt = await bcrypt.genSalt(10);
      customer.customer_password = await bcrypt.hash(customer_password, salt);
    }

    await customer.save();
    return res.json({ message: "Profile updated successfully", customer });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};