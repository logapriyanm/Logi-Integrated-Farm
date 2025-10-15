// routes/settingsRoutes.js
import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import SettingsModel from "../models/settingsModel.js";

const router = express.Router();

// Get all settings
router.get("/settings", adminAuth, async (req, res) => {
  try {
    let settings = await SettingsModel.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await SettingsModel.create({});
    }
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// Save all settings
router.post("/settings", adminAuth, async (req, res) => {
  try {
    const settingsData = req.body;
    let settings = await SettingsModel.findOne();
    
    if (settings) {
      settings = await SettingsModel.findOneAndUpdate({}, settingsData, { new: true });
    } else {
      settings = await SettingsModel.create(settingsData);
    }
    
    res.json({ message: "Settings saved successfully", settings });
  } catch (error) {
    console.error("Error saving settings:", error);
    res.status(500).json({ message: "Failed to save settings" });
  }
});

export default router;