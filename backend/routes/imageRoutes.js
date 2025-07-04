const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const upload = require("../utils/multer");
const OpenAI = require("openai");
const { GoogleGenAI, PersonGeneration } = require("@google/genai");

const { InferenceClient } = require("@huggingface/inference");

const Image = require("../models/Image");
const authMiddleware = require("../middleware/authMiddleware");
console.log("ENV KEY:", process.env.OPEN_AI_API_KEY);

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const client = new InferenceClient(process.env.HUGGING_FACE);

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI });
router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openAi.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });
    const imageUrl = response.data.data[0].url;

    res.status(201).json({ imageUrl: imageUrl });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Server error - ${error.code}`,
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/01/29/22/47/ai-generated-8540915_1280.jpg",
    });
  }
});

router.post("/generate-genai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;

    if (!parts) {
      return res.status(500).json({ message: "No content returned." });
    }

    for (const part of parts) {
      if (part.inlineData) {
        const base64Image = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64Image}`;

        return res.status(201).json({ imageUrl });
      }
    }

    return res.status(500).json({ message: "No image returned." });
  } catch (error) {
    console.error("Gemini image generation failed:", error.message);
    return res.status(500).json({
      message: "Failed to generate image",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/01/29/22/47/ai-generated-8540915_1280.jpg",
    });
  }
});

router.post("/huggingFace", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );
    if (!response.ok) {
      throw new Error(`Hugging face Error:${response.statusText}`);
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    res.status(200).json({
      imageUrl: `data:image/png;base64,${base64}`,
    });
  } catch (error) {
    console.error("Image generation failed:", error.message);
    res.status(500).json({
      message: "Failed to generate image",
      imageUrl:
        "https://cdn.pixabay.com/photo/2024/01/29/22/47/ai-generated-8540915_1280.jpg",
    });
  }
});

router.post("/generate-video", async (req, res) => {
  const { prompt, ratio } = req.body;

  const requestBody = {
    instances: [{ prompt }],
    parameters: {
      aspectRatio: ratio,
      PersonGeneration: "dont_allow",
    },
  };
});

router.post("/wan-video-gen", async (req, res) => {
  const { prompt } = req.body;
  try {
    console.log(prompt);
    const result = await client.textToVideo({
      provider: "fal-ai",
      model: "Wan-AI/Wan2.1-T2V-14B",
      inputs: prompt,
    });
    console.log(result);
    const buffer = await result.arrayBuffer();

    res.setHeader("Content-Type", "video/mp4");

    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Video generation failed" });
  }
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No Image file found!" });
    try {
      const image = new Image({
        url: file.path,
        public_id: file.filename,
        theme,
        creatorId: req.user,
        creatorName,
      });
      await image.save();
      res.status;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Upload Failed!" });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images" });
  }
});

router.get("/my", authMiddleware, async (req, res) => {
  try {
    const images = await Image.find({ creatorId: req.user }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user images" });
  }
});

router.get("/search", authMiddleware, async (req, res) => {
  const { q } = req.query;
  try {
    const images = await Image.find({
      $or: [
        { theme: { $regex: q, $options: "i" } },
        { creatorName: { $regex: q, $options: "i" } },
      ],
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error searching images" });
  }
});

module.exports = router;
