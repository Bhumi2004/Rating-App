import User from "../models/User.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import bcrypt from "bcryptjs";


// Admin dashboard summary
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get users list with filters & sort
export const getUsersList = async (req, res) => {
  try {
    const { name, email, address, role, sort, order } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };
    if (role) query.role = role;

    const sortOrder = order === "desc" ? -1 : 1;
    const sortBy = sort ? { [sort]: sortOrder } : {};

    const users = await User.find(query).sort(sortBy);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get stores list with filters, sort & avg rating
export const getStoresList = async (req, res) => {
  try {
    const { name, email, address, sort, order } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };

    const sortOrder = order === "desc" ? -1 : 1;
    const sortBy = sort ? { [sort]: sortOrder } : {};

    const stores = await Store.find(query).sort(sortBy);

    // Add avg rating for each store
    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.find({ storeId: store._id });
        const avgRating = ratings.length
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0;
        return { ...store.toObject(), avgRating: avgRating.toFixed(1) };
      })
    );

    res.json(storesWithRatings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const createUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
  name,
  email,
  address,
  passwordHash: hashedPassword, // ✅ matches schema
  role:"owner"
});


    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};
