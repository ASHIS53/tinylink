require("dotenv").config();
const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/linkRoutes");
const ctrl = require("./controllers/linkController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (must be BEFORE anything else)
app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

// Mount API routes under /api
app.use("/api", linkRoutes);

// Catch-all redirect (must be LAST)
app.get("/:code", ctrl.redirect);

module.exports = app;
