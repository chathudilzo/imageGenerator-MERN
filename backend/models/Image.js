const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    theme: String,
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USer",
    },
    creatorName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
