// server/src/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Snippet from "./models/Snippet.js";
import User from "./models/User.js";

dotenv.config();

const seedSnippets = [
  {
    title: "Bootstrap Navbar",
    category: "navigation",
    framework: "HTML",
    code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">UI Forge</a>
</nav>`,
    tags: ["bootstrap", "navbar", "responsive"]
  },
  {
    title: "Hero Section",
    category: "layout",
    framework: "HTML",
    code: `<section class="py-5 bg-light text-center">
  <div class="container">
    <h1 class="display-4">Build Faster with UI Forge</h1>
  </div>
</section>`,
    tags: ["hero", "layout", "bootstrap"]
  }
];

// 👤 User info
const seedUser = {
  username: "Raphael Kamunyu",
  email: "rahvickam@gmail.com",
  password: "$124$Rahvic$124$"
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
    console.log("Inserted snippets 🚀");

    // Hash password and insert user
    const passwordHash = await bcrypt.hash(seedUser.password, 10);
    const user = new User({
      username: seedUser.username,
      email: seedUser.email,
      passwordHash,
      provider: "local",
      roles: ["admin"]
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
