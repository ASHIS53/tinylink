require("dotenv").config();
const express = require("express");
const cors = require("cors");
const linkRoutes = require("./routes/linkRoutes");
const app = express();

// CORS middleware with origin config
app.use(cors());

app.use(express.json());
app.use(linkRoutes);

app.get("/healthz", (_req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
});

module.exports = app;
