const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/linkController");

router.post("/api/links", ctrl.createLink);
router.get("/api/links", ctrl.getLinks);
router.get("/api/links/:code", ctrl.getStats);
router.delete("/api/links/:code", ctrl.deleteLink);
router.get("/:code", ctrl.redirect);

module.exports = router;
