// controllers/settingsController.js
import SettingsModel from "../models/settingsModel.js";

// Get all settings
export const getSettings = async (req, res) => {
  try {
    let settings = await SettingsModel.findOne();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = await SettingsModel.create({});
    }
    
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    const settingsData = req.body;
    
    let settings = await SettingsModel.findOne();
    
    if (settings) {
      // Update existing settings
      settings = await SettingsModel.findOneAndUpdate(
        {}, 
        settingsData, 
        { new: true, runValidators: true }
      );
    } else {
      // Create new settings
      settings = await SettingsModel.create(settingsData);
    }
    
    res.json({ 
      message: "Settings updated successfully", 
      settings 
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};