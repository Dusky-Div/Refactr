import mongoose from "mongoose";

const CodeDataSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: true,
    },
    refactredCode: {
      type: String,
      required: false,
    },
    analysisResult: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CodeData = mongoose.model("CodeData", CodeDataSchema);
export default CodeData;
