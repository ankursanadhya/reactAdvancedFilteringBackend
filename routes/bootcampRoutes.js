const express = require("express");
const router = express.Router();
const bootcampController = require("../controllers/bootcampController");
router
  .route("/")
  .get(bootcampController.getAllBootcamps)
  .post(bootcampController.createNewBootcamp);
router
  .route("/:id")
  .put(bootcampController.updateBootcampById)
  .delete(bootcampController.deleteBootcampById);
module.exports = router;
