import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 20 },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    status: { type: String, required: true, enum: ["unsold", "sold"] },
  },
  { timestamps: true }
);

const Listing = mongoose.model("listing", listingSchema);

export default Listing;
