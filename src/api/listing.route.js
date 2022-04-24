import { Router } from "express";
import {
  createListing,
  getListing,
  getListings,
  deleteListing,
  purchaseListing,
  editListing,
} from "../controllers/listing.controller.js";
import asyncMiddleware from "../middleware/async-wrapper.js";
import protect from "../middleware/auth-middleware.js";

const router = Router();

router.get("/page/:page", protect, asyncMiddleware(getListings));
router.post("/purchase/:id", protect, asyncMiddleware(purchaseListing));
router.put("/:id", protect, asyncMiddleware(editListing));
router.delete("/:id", protect, asyncMiddleware(deleteListing));
router.get("/:id", asyncMiddleware(getListing));
router.post("/", protect, asyncMiddleware(createListing));

export default router;
