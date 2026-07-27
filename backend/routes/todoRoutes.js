const express = require("express");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
} = require("../controllers/todoController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.use(isAuthenticatedUser);

// Get all todos
router.get("/", getAllTodos);

// Get single todo
router.get("/:id", getTodoById);

// Create todo
router.post("/", createTodo);

// Update complete todo
router.put("/:id", updateTodo);

// Update partial fields
router.patch("/:id", patchTodo);

// Delete todo
router.delete("/:id", deleteTodo);

module.exports = router;