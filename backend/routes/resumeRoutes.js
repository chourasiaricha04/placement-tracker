const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const { analyzeResume } = require("../services/geminiService");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res) => {
    let uploadedFilePath;

    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a resume PDF.",
        });
      }

      uploadedFilePath = req.file.path;

      const dataBuffer = fs.readFileSync(uploadedFilePath);

      const pdfData = await pdf(dataBuffer);

      const resumeText = pdfData.text?.trim();

      if (!resumeText) {
        return res.status(400).json({
          message: "Could not extract text from the resume.",
        });
      }

      console.log("✅ Resume text extracted");
      console.log("➡️ Sending resume to Gemini...");

      // Keep the original text instead of converting it to lowercase.
      const aiResponse = await analyzeResume(resumeText);

      console.log("✅ Gemini response received");

      const cleanResponse = aiResponse
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      let parsedResponse;

      try {
        parsedResponse = JSON.parse(cleanResponse);
      } catch (parseError) {
        console.error("Gemini returned invalid JSON:");
        console.error(cleanResponse);

        return res.status(500).json({
          message: "AI returned an invalid response. Please try again.",
        });
      }

      return res.status(200).json(parsedResponse);
    } catch (error) {
      console.error("Resume Analyzer Error:", error);

      return res.status(500).json({
        message:
          error.message || "Unable to analyze the resume.",
      });
    } finally {
      // Delete the temporary uploaded resume after processing.
      if (
        uploadedFilePath &&
        fs.existsSync(uploadedFilePath)
      ) {
        fs.unlinkSync(uploadedFilePath);
      }
    }
  }
);

module.exports = router;