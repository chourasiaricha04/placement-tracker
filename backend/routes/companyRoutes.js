const express = require("express");
const Company = require("../models/Company");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ================= ADD COMPANY =================

router.post("/add", protect, async (req, res) => {
  try {
    const { companyName, role, status } = req.body;

    const company = await Company.create({
      companyName,
      role,
      status,
      user: req.user.id,
    });

    res.status(201).json(company);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET ALL COMPANIES =================

router.get("/", protect, async (req, res) => {
  try {
    const companies = await Company.find({
      user: req.user.id,
    });

    res.status(200).json(companies);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= UPDATE COMPANY =================

router.put("/:id", protect, async (req, res) => {
  try {

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // Sirf apni company update kar sakta hai
    if (company.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCompany);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= DELETE COMPANY =================

router.delete("/:id", protect, async (req, res) => {
  try {

    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // Sirf apni company delete kar sakta hai
    if (company.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Company Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;