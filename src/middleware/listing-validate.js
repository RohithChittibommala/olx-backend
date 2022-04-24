import { body } from "express-validator";

const createListingRules = () => {
  const rules = [
    body("name", "name must be at least 3 characters").isLength({ min: 3 }),
    body("description", "description must be at least 20 characters").isLength({
      min: 20,
      max: 40,
    }),
    body("price", "price must be at least 0").isInt({ min: 0 }),
    body("image", "image must be a valid url").isURL(),
  ];
};

export { createListingRules };
