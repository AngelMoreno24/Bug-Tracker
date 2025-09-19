import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Company from "../models/Company.js";
import Project from "../models/Project.js";
import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";

dotenv.config();

const seedDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB ✅");

    // Clear existing demo data
    await User.deleteMany({ isDemo: true });
    await Company.deleteMany({ isDemo: true });
    await Project.deleteMany({ isDemo: true });
    await Ticket.deleteMany({ isDemo: true });
    await Comment.deleteMany({ isDemo: true });

    // Create demo company
    const company = await Company.create({
      name: "Demo Company",
      isDemo: true,
    });

    // Create demo users
    const demoUser = await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "demopassword", // hash in real app
      company: company._id,
      isDemo: true,
    });

    const member1 = await User.create({
      name: "Alice Tester",
      email: "alice@example.com",
      password: "password123",
      company: company._id,
      isDemo: true,
    });

    const member2 = await User.create({
      name: "Bob Developer",
      email: "bob@example.com",
      password: "password123",
      company: company._id,
      isDemo: true,
    });

    // Create demo project
    const project = await Project.create({
      name: "Website Redesign",
      description: "Demo project for showcasing ticket tracking",
      company: company._id,
      members: [demoUser._id, member1._id, member2._id],
      isDemo: true,
    });

    // Create demo tickets
    const ticket1 = await Ticket.create({
      title: "Fix login bug",
      description: "Users are unable to reset their password.",
      projectId: project._id,
      createdBy: demoUser._id,
      assignedTo: member1._id,
      priority: "High",
      status: "Open",
      type: "Bug",
      isDemo: true,
    });

    const ticket2 = await Ticket.create({
      title: "Add dark mode",
      description: "Implement dark mode across the whole app.",
      projectId: project._id,
      createdBy: member1._id,
      assignedTo: member2._id,
      priority: "Medium",
      status: "In Progress",
      type: "Feature",
      isDemo: true,
    });

    // Add comments to tickets
    await Comment.create([
      {
        ticketId: ticket1._id,
        author: demoUser._id,
        message: "I’ll take a look at this issue today.",
        isDemo: true,
      },
      {
        ticketId: ticket1._id,
        author: member1._id,
        message: "Found the root cause in the auth controller.",
        isDemo: true,
      },
      {
        ticketId: ticket2._id,
        author: member2._id,
        message: "Started working on the theme switcher.",
        isDemo: true,
      },
      {
        ticketId: ticket2._id,
        author: member1._id,
        message: "Let’s make sure to include accessibility checks.",
        isDemo: true,
      },
    ]);

    console.log("Demo data seeded successfully 🎉");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDemoData();