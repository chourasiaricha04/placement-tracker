const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(dataBuffer);

    const resumeText = pdfData.text.toLowerCase();

    const skills = [
      "java",
      "python",
      "react",
      "node",
      "express",
      "mongodb",
      "mysql",
      "javascript",
      "html",
      "css",
      "git",
      "github",
      "docker",
      "aws",
      "redis",
    ];

    const matchedSkills = [];
    const missingSkills = [];

    skills.forEach((skill) => {
      if (resumeText.includes(skill)) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    const score = Math.round(
      (matchedSkills.length / skills.length) * 100
    );

    res.json({
      score,
      matchedSkills,
      missingSkills,
    });

  } catch (error) {

  console.error("Resume Analyzer Error:", error);

  res.status(500).json({
    message: error.message,
  });

}
});

module.exports = router;