const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// @route   GET /api/tasks
// @desc    جلب جميع المهام
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // جلب وفرز المهام
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tasks
// @desc    إنشاء مهمة جديدة
router.post("/", async (req, res) => {
  // التحقق من وجود النص
  if (!req.body.text) {
    return res.status(400).json({ message: "please enter a task" });
  }

  try {
    const newTask = await Task.create({
      text: req.body.text,
    });
    res.status(201).json(newTask); // 201: Created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    تحديث مهمة (مثل تغيير النص أو حالة الإكمال)
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // لإرجاع المهمة بعد التحديث
      runValidators: true, // لتطبيق قواعد التحقق (مثل required)
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "task is not exist." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    حذف مهمة
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "task is not exist." });
    }

    // إرسال ID المهمة المحذوفة للتطبيق الأمامي
    res
      .status(200)
      .json({ id: req.params.id, message: "task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
