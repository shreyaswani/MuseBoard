// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");

const app = express();
app.use(cors());
app.use(express.json());

// configure cloudinary with env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET /api/images?prefix=myfolder&max=200
app.get("/api/images", async (req, res) => {
  try {
    const prefix = req.query.prefix || ""; // optional folder/prefix
    const maxRequested = parseInt(req.query.max || "200", 10);

    let resources = [];
    let next_cursor;
    // fetch pages until we have enough or no cursor
    do {
      const opts = {
        type: "upload",
        resource_type: "image",
        max_results: Math.min(500, Math.max(1, maxRequested - resources.length)),
      };
      if (prefix) opts.prefix = prefix;
      if (next_cursor) opts.next_cursor = next_cursor;

      const result = await cloudinary.api.resources(opts);
      resources = resources.concat(result.resources || []);
      next_cursor = result.next_cursor;
    } while (next_cursor && resources.length < maxRequested);

    // minimal response to frontend
    const payload = resources.map((r) => ({
      asset_id: r.asset_id,
      public_id: r.public_id,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      format: r.format,
    }));

    res.json(payload);
  } catch (err) {
    console.error("Cloudinary fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
