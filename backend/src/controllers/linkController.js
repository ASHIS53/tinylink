const linkModel = require("../models/linkModel");
const isValidUrl = require("../utils/validateUrl");

exports.createLink = async (req, res) => {
  const { target_url, short_code } = req.body;
  if (!isValidUrl(target_url))
    return res.status(400).json({ error: "Invalid URL" });
  if (!/^[A-Za-z0-9]{6,8}$/.test(short_code))
    return res.status(400).json({ error: "Invalid code format" });
  const exists = await linkModel.getLinkByCode(short_code);
  if (exists.rows.length)
    return res.status(409).json({ error: "Code already exists" });
  const result = await linkModel.createLink({ target_url, short_code });
  res.status(201).json(result.rows[0]);
};

exports.getLinks = async (_req, res) => {
  const links = await linkModel.listLinks();
  res.json(links.rows);
};

exports.getStats = async (req, res) => {
  const { code } = req.params;
  const link = await linkModel.getLinkByCode(code);
  if (!link.rows.length) return res.status(404).json({ error: "Not found" });
  res.json(link.rows[0]);
};

exports.deleteLink = async (req, res) => {
  const { code } = req.params;
  await linkModel.deleteLink(code);
  res.status(204).send();
};

exports.redirect = async (req, res) => {
  const { code } = req.params;
  const link = await linkModel.getLinkByCode(code);
  if (!link.rows.length) return res.status(404).send("Not found");
  await linkModel.incrementClick(code);
  res.redirect(302, link.rows[0].target_url);
};
