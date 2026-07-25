require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("../models/todo");

const seedTodos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing todos
    await Todo.deleteMany({});
    console.log("Cleared existing todos");

    // Create fake todos
    const fakeTodos = [
      {
        title: "Buy groceries",
        description: "Milk, eggs, bread, and vegetables",
        priority: "high",
        completed: false,
      },
      {
        title: "Complete project documentation",
        description: "Write README and API documentation",
        priority: "medium",
        completed: false,
      },
      {
        title: "Call mom",
        description: "Weekly catch-up call",
        priority: "medium",
        completed: true,
      },
      {
        title: "Exercise for 30 minutes",
        description: "Go for a run or gym workout",
        priority: "low",
        completed: false,
      },
      {
        title: "Learn Node.js",
        description: "Complete MongoDB integration tutorial",
        priority: "high",
        completed: false,
      },
    ];

    await Todo.insertMany(fakeTodos);
    console.log("Fake todos created successfully!");

    console.log("\nCreated todos:");
    const todos = await Todo.find();
    todos.forEach(todo => {
      console.log(`- ${todo.title} (${todo.priority})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding todos:", error);
    process.exit(1);
  }
};

seedTodos();
