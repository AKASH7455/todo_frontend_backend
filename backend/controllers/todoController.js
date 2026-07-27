const Todo = require("../models/todo");

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

// Get single todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to access it",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todo",
      error: error.message,
    });
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating todo",
      error: error.message,
    });
  }
};

// Update complete todo
exports.updateTodo = async (req, res) => {
  try {
    const { user, ...updates } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating todo",
      error: error.message,
    });
  }
};

// Update partial fields
exports.patchTodo = async (req, res) => {
  try {
    const { user, ...updates } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to update it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo patched successfully",
      data: todo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error patching todo",
      error: error.message,
    });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting todo",
      error: error.message,
    });
  }
};