import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    let shortId;
    let exists;

    
    do {
      shortId = nanoid(7);
      exists = await Url.findOne({ shortId });
    } while (exists);

    const url = await Url.create({
      originalUrl,
      shortId,
    });

    res.json({
      shortId: url.shortId,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.originalUrl);
    }

    return res.status(404).json({ error: "URL not found" });
  } catch (error) {
    console.error("Error fetching short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
