import Rating from "../models/Rating.js";

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({ message: "Store ID and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    let userRating = await Rating.findOne({ userId: req.user.id, storeId });

    if (userRating) {
      // Update existing rating
      userRating.rating = rating;
      await userRating.save();
      return res.json({ message: "Rating updated" });
    }

    // New rating
    const newRating = new Rating({
      userId: req.user.id,
      storeId,
      rating
    });

    await newRating.save();
    res.json({ message: "Rating submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await Rating.find({ storeId })
      .populate("userId", "name email"); // show user's name & email

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


