import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import User from "../models/User.js";



export const createStore = async (req, res) => {
    console.log("createStore called");
    console.log("📩 createStore called by:", req.user);
  console.log("📦 Request body:", req.body);

  try {
    let { name, email, address, ownerId } = req.body;

    // If no ownerId provided, use logged-in user's id
    if (!ownerId) {
      ownerId = req.user.id;
    }

    const store = new Store({ name, email, address, ownerId });
    await store.save();

    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };

    const stores = await Store.find(query);

    const storesWithRatings = await Promise.all(
      stores.map(async (store) => {
        // Get all ratings for this store
        const ratings = await Rating.find({ storeId: store._id });

        // Calculate average rating
        const avgRating = ratings.length
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0;

        // Find current user's rating for this store
        const myRatingDoc = ratings.find(r => r.userId.toString() === req.user.id);
        const myRating = myRatingDoc ? myRatingDoc.rating : null;

        return {
          ...store.toObject(),
          avgRating: avgRating.toFixed(1),
          myRating
        };
      })
    );

    res.json(storesWithRatings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOwnerStore = async (req, res) => {
  try {
    const store = await Store.findOne({ ownerId: req.user.id });
    if (!store) {
      return res.status(404).json({ message: "No store found for this owner" });
    }

    const ratings = await Rating.find({ storeId: store._id });

    const avgRating = ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
      : 0;

    const ratedUsers = await Promise.all(
      ratings.map(async r => {
        const user = await User.findById(r.userId).select("name email");
        return { ...user.toObject(), rating: r.rating };
      })
    );

    res.json({
      store,
      avgRating,
      ratedUsers
    });
  } catch (err) {
    console.error("❌ Error fetching owner store:", err);
    res.status(500).json({ message: "Error fetching owner store" });
  }
};
