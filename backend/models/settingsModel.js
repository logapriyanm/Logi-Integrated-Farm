// models/settingsModel.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  general: {
    storeName: { type: String, default: "FarmFresh Market" },
    contactEmail: { type: String, default: "admin@farmfresh.com" },
    phoneNumber: { type: String, default: "+91 9876543210" },
    address: { type: String, default: "123 Farm Street, Agricultural Zone" },
    currency: { type: String, default: "INR" },
    timezone: { type: String, default: "Asia/Kolkata" },
    businessHours: { type: String, default: "9:00 AM - 8:00 PM" }
  },
  payment: {
    enableCOD: { type: Boolean, default: true },
    enableOnlinePayments: { type: Boolean, default: true },
    stripeEnabled: { type: Boolean, default: false },
    razorpayEnabled: { type: Boolean, default: true },
    testMode: { type: Boolean, default: true },
    minimumOrderAmount: { type: Number, default: 100 }
  },
  shipping: {
    deliveryFee: { type: Number, default: 50 },
    freeDeliveryThreshold: { type: Number, default: 500 },
    enableLocalPickup: { type: Boolean, default: true },
    estimatedDeliveryDays: { type: String, default: "2-3" },
    shippingZones: [{
      name: String,
      cost: Number,
      areas: [String]
    }]
  },
  notifications: {
    newOrder: { type: Boolean, default: true },
    lowStock: { type: Boolean, default: true },
    failedPayment: { type: Boolean, default: true },
    orderShipped: { type: Boolean, default: true },
    orderDelivered: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    pushNotifications: { type: Boolean, default: true }
  },
  products: {
    lowStockThreshold: { type: Number, default: 5 },
    enableBackorders: { type: Boolean, default: false },
    productsPerPage: { type: Number, default: 12 },
    enableReviews: { type: Boolean, default: true },
    autoApproveReviews: { type: Boolean, default: false },
    taxRate: { type: Number, default: 18 },
    enableWishlist: { type: Boolean, default: true }
  },
  security: {
    twoFA: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 60 },
    maxLoginAttempts: { type: Number, default: 5 },
    enableSSL: { type: Boolean, default: true },
    ipWhitelist: { type: [String], default: ["127.0.0.1"] }
  },
  seo: {
    metaTitle: { type: String, default: "FarmFresh - Fresh Farm Products" },
    metaDescription: { type: String, default: "Buy fresh farm products, organic vegetables, and livestock online" },
    googleAnalyticsId: { type: String, default: "" },
    facebookPixelId: { type: String, default: "" },
    enableSitemap: { type: Boolean, default: true },
    socialMedia: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" }
    }
  },
  appearance: {
    primaryColor: { type: String, default: "#16a34a" },
    secondaryColor: { type: String, default: "#10b981" },
    fontFamily: { type: String, default: "Inter" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    enableDarkMode: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false }
  },
  email: {
    smtpHost: { type: String, default: "" },
    smtpPort: { type: Number, default: 587 },
    smtpUsername: { type: String, default: "" },
    smtpPassword: { type: String, default: "" },
    fromEmail: { type: String, default: "noreply@farmfresh.com" },
    fromName: { type: String, default: "FarmFresh Market" }
  }
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);