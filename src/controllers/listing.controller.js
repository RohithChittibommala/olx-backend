import ErrorHandler from "../error-handler/index.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

const createListing = async (req, res) => {
  const { name, description, price, image } = req.body;
  const userId = req.user._id;
  const listing = new Listing({
    name,
    description,
    price,
    image,
    authorId: userId,
    status: "unsold",
  });

  const user = await User.findById(userId);
  user.listings.push(listing);
  await user.save();
  await listing.save();
  res.json({ listing });
};

const deleteListing = async (req, res, next) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);

  if (!listing) return next(new ErrorHandler(400, "Listing not found"));

  if (listing.status === "sold") {
    return next(new ErrorHandler(400, "Listing already sold"));
  }

  if (listing.authorId.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(403, "You are not authorized to delete this listing")
    );
  }

  await Listing.findByIdAndDelete(id);

  res.json({ message: "Listing deleted successfully" });
};

const purchaseListing = async (req, res, next) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);

  if (!listing) return next(new ErrorHandler(400, "Listing not found"));

  if (listing.status === "sold") {
    return next(new ErrorHandler(400, "Listing already sold"));
  }

  if (listing.authorId.toString() === req.user._id.toString()) {
    return next(new ErrorHandler(400, "You cannot purchase your own listing"));
  }

  listing.status = "sold";
  listing.purchaserId = req.user._id;
  await listing.save();

  const user = await User.findById(req.user._id);
  user.purchases.push(listing);
  await user.save();

  res.json({ listing });
};

const getListing = async (req, res, next) => {
  const id = req.params.id;
  const listing = await Listing.findById(id).populate("authorId");
  if (!listing) return next(new ErrorHandler(400, "Listing not found"));
  res.json({ listing });
};

const getListings = async (req, res, next) => {
  const page = req.params.page || 1;
  const userId = req.user._id;
  const resPerPage = 10;
  const listings = await Listing.find({
    authorId: { $ne: userId },
    status: {
      $ne: "sold",
    },
  })
    .skip((page - 1) * resPerPage)
    .limit(resPerPage);
  const totalNoOfListings = await Listing.countDocuments({
    authorId: { $ne: userId },
    status: {
      $ne: "sold",
    },
  });
  res.json({ listings, count: totalNoOfListings });
};

const editListing = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, image } = req.body;
  const listing = await Listing.findById(id);

  if (!listing) return next(new ErrorHandler(400, "Listing not found"));

  if (listing.authorId.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler(403, "You are not authorized to edit this listing")
    );
  }

  console.log({ name, description, price, image });

  await Listing.findByIdAndUpdate(id, {
    name,
    description,
    price,
    image,
  });
  res.json({ listing });
};

export {
  createListing,
  deleteListing,
  getListing,
  editListing,
  getListings,
  purchaseListing,
};
