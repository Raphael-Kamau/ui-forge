// server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

dotenv.config();

const seedSnippets = [
  // --- Navigation ---
  {
    title: "Bootstrap Navbar",
    category: "navigation",
    framework: "bootstrap",
    code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">UI Forge</a>
</nav>`,
    tags: ["bootstrap", "navbar", "responsive"],
  },
  {
    title: "Tailwind Navbar",
    category: "navigation",
    framework: "tailwind",
    code: `<nav class="bg-gray-800 p-4 flex justify-between">
  <a href="#" class="text-white font-bold">UI Forge</a>
</nav>`,
    tags: ["tailwind", "navbar", "responsive"],
  },
  // --- Buttons ---
{
  title: "Bootstrap Primary Button",
  category: "button",
  framework: "bootstrap",
  code: `<button class="btn btn-primary">Click Me</button>`,
  tags: ["bootstrap", "button", "primary"],
},
{
  title: "Tailwind Outline Button",
  category: "button",
  framework: "tailwind",
  code: `<button class="border border-blue-600 text-blue-600 px-4 py-2 rounded">
  Outline
</button>`,
  tags: ["tailwind", "button", "outline"],
},

// --- Modals ---
{
  title: "Bootstrap Modal",
  category: "modal",
  framework: "bootstrap",
  code: `<div class="modal fade" id="exampleModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">UI Forge Modal</h5>
      </div>
      <div class="modal-body">Hello World!</div>
    </div>
  </div>
</div>`,
  tags: ["bootstrap", "modal"],
},
{
  title: "Tailwind Modal",
  category: "modal",
  framework: "tailwind",
  code: `<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white p-6 rounded shadow-lg">
    <h2 class="text-xl font-bold mb-4">UI Forge Modal</h2>
    <p>Hello World!</p>
  </div>
</div>`,
  tags: ["tailwind", "modal"],
},

// --- Alerts ---
{
  title: "Bootstrap Alert",
  category: "alert",
  framework: "bootstrap",
  code: `<div class="alert alert-success" role="alert">
  Operation successful!
</div>`,
  tags: ["bootstrap", "alert", "success"],
},
{
  title: "Tailwind Alert",
  category: "alert",
  framework: "tailwind",
  code: `<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
  Operation successful!
</div>`,
  tags: ["tailwind", "alert", "success"],
},

// --- Grid Layouts ---
{
  title: "Bootstrap Grid",
  category: "layout",
  framework: "bootstrap",
  code: `<div class="container">
  <div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
  </div>
</div>`,
  tags: ["bootstrap", "grid", "layout"],
},
{
  title: "Tailwind Grid",
  category: "layout",
  framework: "tailwind",
  code: `<div class="grid grid-cols-2 gap-4">
  <div class="bg-gray-200 p-4">Column 1</div>
  <div class="bg-gray-200 p-4">Column 2</div>
</div>`,
  tags: ["tailwind", "grid", "layout"],
},

// --- Footers ---
{
  title: "Bootstrap Footer",
  category: "footer",
  framework: "bootstrap",
  code: `<footer class="bg-dark text-white text-center py-3">
  © 2025 UI Forge
</footer>`,
  tags: ["bootstrap", "footer"],
},
{
  title: "Tailwind Footer",
  category: "footer",
  framework: "tailwind",
  code: `<footer class="bg-gray-800 text-white text-center py-3">
  © 2025 UI Forge
</footer>`,
  tags: ["tailwind", "footer"],
},

// --- React Component ---
{
  title: "React Card Component",
  category: "card",
  framework: "react",
  code: `import React from "react";

export const Card = ({ title, text }) => (
  <div className="border rounded p-4 shadow">
    <h3 className="font-bold text-lg">{title}</h3>
    <p>{text}</p>
  </div>
);`,
  tags: ["react", "card", "component"],
},

// --- Vue Component ---
{
  title: "Vue Button Component",
  category: "button",
  framework: "vue",
  code: `<template>
  <button class="bg-blue-600 text-white px-4 py-2 rounded">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true }
  }
}
</script>`,
  tags: ["vue", "button", "component"],
},

];

// 👤 User info (match schema)
const seedUser = {
  name: "Raphael Kamunyu",
  email: "rahvickam@gmail.com",
  password: "$4Rahvic$",
};

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Snippet.deleteMany({});
    await User.deleteMany({ email: seedUser.email });

    // Insert snippets
    await Snippet.insertMany(seedSnippets);
    console.log(`🚀 Inserted ${seedSnippets.length} snippets`);

    // Hash password and insert user
    const passwordHash = await bcrypt.hash(seedUser.password, 10);
    const user = new User({
      name: seedUser.name,
      email: seedUser.email,
      passwordHash,
    });
    await user.save();
    console.log(`👤 Inserted user: ${user.email}`);

    await mongoose.disconnect();
    console.log("🔒 Database connection closed");
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  }
}

seedDB();
