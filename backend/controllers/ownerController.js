import Store from "../models/Store.js";
import Rating from "../models/Rating.js";

export const getOwnerDashboard = async (req, res) => {
  try {
    
    const store = await Store.findOne({ ownerId: req.user.id });
    if (!store) {
      return res.status(404).json({ message: "No store found for this owner" });
    }

    
    const ratings = await Rating.find({ storeId: store._id })
      .populate("userId", "name email"); 

    
    const avgRating = ratings.length
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    res.json({
      store: {
        id: store._id,
        name: store.name,
        email: store.email,
        address: store.address
      },
      avgRating: avgRating.toFixed(1),
      ratedUsers: ratings.map(r => ({
        userId: r.userId._id,
        name: r.userId.name,
        email: r.userId.email,
        rating: r.rating
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
