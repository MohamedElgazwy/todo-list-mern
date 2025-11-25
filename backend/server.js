const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// استيراد ملف الـ Routes الخاص بالمهام
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = process.env.PORT || 5000;

// ************************ Middleware ************************
// 1. لتحليل (Parse) البيانات القادمة من الجسم (Body) في صيغة JSON
app.use(express.json());

// ************************ الاتصال بقاعدة البيانات ************************
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB successfully!");

    // تشغيل الخادم بعد نجاح الاتصال
    app.listen(port, () => {
      console.log(`🚀 server work on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(" failed to connect with database", error.message);
    process.exit(1); // إنهاء العملية
  }
};

// ************************ تعريف المسارات (Routes) ************************
// المسار الرئيسي للترحيب
app.get("/", (req, res) => {
  res.send("Welcome to the Todo List API");
});

// ربط مسارات المهام بالـ API
app.use("/api/tasks", taskRoutes);

// تشغيل وظيفة الاتصال بالـ DB والبدء بالخادم
connectDB();
