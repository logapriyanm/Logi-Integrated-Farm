import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ proper user object
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
