// server/src/seed.js
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

  // --- Hero Sections ---
  {
    title: "Bootstrap Hero Section",
    category: "layout",
    framework: "bootstrap",
    code: `<section class="py-5 bg-light text-center">
  <div class="container">
    <h1 class="display-4">Build Faster with UI Forge</h1>
  </div>
</section>`,
    tags: ["hero", "layout", "bootstrap"],
  },
  {
    title: "Tailwind Hero Section",
    category: "layout",
    framework: "tailwind",
    code: `<section class="bg-blue-600 text-white py-20 text-center">
  <h1 class="text-4xl font-bold">Build Faster with UI Forge</h1>
</section>`,
    tags: ["hero", "layout", "tailwind"],
  },

  // --- Cards ---
  {
    title: "Bootstrap Card",
    category: "card",
    framework: "bootstrap",
    code: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">UI Forge Card</h5>
    <p class="card-text">Reusable Bootstrap card component.</p>
  </div>
</div>`,
    tags: ["bootstrap", "card"],
  },
  {
    title: "Tailwind Card",
    category: "card",
    framework: "tailwind",
    code: `<div class="max-w-sm rounded overflow-hidden shadow-lg p-4">
  <h5 class="font-bold text-xl mb-2">UI Forge Card</h5>
  <p class="text-gray-700">Reusable Tailwind card component.</p>
</div>`,
    tags: ["tailwind", "card"],
  },

  // --- Forms ---
  {
    title: "Bootstrap Login Form",
    category: "form",
    framework: "bootstrap",
    code: `<form>
  <div class="mb-3">
    <label>Email</label>
    <input type="email" class="form-control" />
  </div>
  <div class="mb-3">
    <label>Password</label>
    <input type="password" class="form-control" />
  </div>
  <button class="btn btn-primary">Login</button>
</form>`,
    tags: ["bootstrap", "form", "login"],
  },
  {
    title: "Tailwind Login Form",
    category: "form",
    framework: "tailwind",
    code: `<form class="space-y-4">
  <input type="email" placeholder="Email" class="border p-2 w-full" />
  <input type="password" placeholder="Password" class="border p-2 w-full" />
  <button class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
</form>`,
    tags: ["tailwind", "form", "login"],
  },

  // --- React/TSX ---
  {
    title: "React TSX Button",
    category: "button",
    framework: "tsx",
    code: `import React from "react";

export const PrimaryButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    {label}
  </button>
);`,
    tags: ["react", "tsx", "button"],
  },

  // --- Vue ---
  {
    title: "Vue Hero Component",
    category: "layout",
    framework: "vue",
    code: `<template>
  <section class="bg-green-500 text-white py-10 text-center">
    <h1 class="text-3xl font-bold">UI Forge Hero</h1>
  </section>
</template>`,
    tags: ["vue", "hero", "layout"],
  },
];

// 👤 User info
const seedUser = {
  username: "Raphael Kamunyu",
  email: "rahvickam@gmail.com",
  password: "$124$Rahvic$124$",
};

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB ✅");

    // Clear old data
    await Snippet.deleteMany({});
    await User.deleteMany({ email: seedUser.email });

    // Insert snippets
    await Snippet.insertMany(seedSnippets);
    console.log(`Inserted ${seedSnippets.length} snippets 🚀`);

    // Hash password and insert user
    const passwordHash = await bcrypt.hash(seedUser.password, 10);
    const user = new User({
      username: seedUser.username,
      email: seedUser.email,
      passwordHash,
      provider: "local",
      roles: ["admin"],
    });
    await user.save();
    console.log("Inserted user 👤", user.email);

    mongoose.connection.close();
    console.log("Database connection closed 🔒");
  } catch (err) {
    console.error("Seeding error ❌", err);
  }
}

seedDB();
