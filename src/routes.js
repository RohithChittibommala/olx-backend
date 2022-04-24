import {
  getMeController,
  loginController,
  registerController,
} from "./controllers/user.controller.js";
import ErrorHandler from "./error-handler/index.js";
import asyncMiddleware from "./middleware/async-wrapper.js";
import protect from "./middleware/auth-middleware.js";
import {
  loginValidationRules,
  registerValidationRules,
  validate,
} from "./middleware/validate-request.js";
import listingRouter from "./api/listing.route.js";

export default function (app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post(
    "/login",
    loginValidationRules(),
    validate,
    asyncMiddleware(loginController)
  );

  app.post(
    "/register",
    registerValidationRules(),
    validate,
    asyncMiddleware(registerController)
  );

  app.use("/listings", listingRouter);

  app.get("/me", protect, getMeController);

  app.get(
    "/user",
    protect,
    asyncMiddleware((req, res) => {
      res.send(req.user);
    })
  );

  app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ErrorHandler) {
      return res.status(err.status).json({ message: err.msg, status: "error" });
    }
    res.status(500).json({ msg: "Internal server error", status: "error" });
  });
}
