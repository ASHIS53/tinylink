const pool = require("../db");
exports.createLink = async ({ target_url, short_code }) =>
  pool.query(
    "INSERT INTO links (target_url, short_code, total_clicks, last_clicked) VALUES ($1, $2, 0, null) RETURNING *",
    [target_url, short_code]
  );

exports.getLinkByCode = async (code) =>
  pool.query("SELECT * FROM links WHERE short_code = $1", [code]);

exports.incrementClick = async (code) =>
  pool.query(
    "UPDATE links SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE short_code = $1 RETURNING *",
    [code]
  );

exports.deleteLink = async (code) =>
  pool.query("DELETE FROM links WHERE short_code = $1", [code]);

exports.listLinks = async () => pool.query("SELECT * FROM links");
