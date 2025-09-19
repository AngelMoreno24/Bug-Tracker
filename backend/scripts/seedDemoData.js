import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../models/UserModel.js";
import Company from "../models/CompanyModel.js";
import CompanyMember from "../models/CompanyMemberModel.js";
import Project from "../models/ProjectModel.js";
import ProjectMember from "../models/ProjectMemberModel.js";
import Ticket from "../models/TicketModel.js";
import Comment from "../models/CommentModel.js";

dotenv.config();
const MONGO_URI = process.env.DB_URL;

const seedDemo = async () => {
    await mongoose.connect(MONGO_URI);

    console.log("Clearing previous demo data...");
    await User.deleteMany({ isDemo: true });
    await Company.deleteMany({ isDemo: true });
    await CompanyMember.deleteMany({ isDemo: true });
    await Project.deleteMany({ isDemo: true });
    await ProjectMember.deleteMany({ isDemo: true });
    await Ticket.deleteMany({ isDemo: true });
    await Comment.deleteMany({ isDemo: true });

    console.log("Creating demo users...");
    const passwordHash = await bcrypt.hash("demo123", 10);
    const demoUsers = await User.insertMany([
        { name: "Demo Admin", email: "demo@example.com", password: passwordHash, isDemo: true },
        { name: "Alice", email: "alice@example.com", password: passwordHash, isDemo: true },
        { name: "Bob", email: "bob@example.com", password: passwordHash, isDemo: true },
    ]);
    const [admin, alice, bob] = demoUsers;

    console.log("Creating demo company...");
    const company = await Company.create({ name: "Demo Company", ownerId: admin._id, isDemo: true });

    console.log("Adding members to company...");
    await CompanyMember.insertMany([
        { userId: admin._id, companyId: company._id, role: "Admin", isDemo: true },
        { userId: alice._id, companyId: company._id, role: "Manager", isDemo: true },
        { userId: bob._id, companyId: company._id, role: "Developer", isDemo: true },
    ]);

    console.log("Creating demo projects...");
    const projects = await Project.insertMany([
        { name: "Demo Project 1", description: "First demo project", companyId: company._id, isDemo: true },
        { name: "Demo Project 2", description: "Second demo project", companyId: company._id, isDemo: true },
    ]);

    console.log("Adding members to projects...");
    for (const project of projects) {
        await ProjectMember.insertMany([
            { projectId: project._id, userId: admin._id, role: "Admin", isDemo: true },
            { projectId: project._id, userId: alice._id, role: "Manager", isDemo: true },
            { projectId: project._id, userId: bob._id, role: "Developer", isDemo: true },
        ]);
    }

    console.log("Creating demo tickets...");
    const ticketsData = [
        // Project 1 tickets
        { title: "Setup project repo", description: "Initialize Git repo", projectId: projects[0]._id, createdBy: admin._id, assignedTo: alice._id, type: "task", status: "open", priority: "high", isDemo: true },
        { title: "Create login page", description: "Responsive login page with demo login button", projectId: projects[0]._id, createdBy: alice._id, assignedTo: bob._id, type: "feature", status: "in-progress", priority: "medium", isDemo: true },
        { title: "Add project members feature", description: "Allow managers to add/remove members", projectId: projects[0]._id, createdBy: admin._id, assignedTo: admin._id, type: "feature", status: "closed", priority: "medium", isDemo: true },
        { title: "Dashboard prototype", description: "Show projects, tickets, assigned tasks", projectId: projects[0]._id, createdBy: bob._id, assignedTo: admin._id, type: "task", status: "open", priority: "low", isDemo: true },
        { title: "Setup comments", description: "Add comments functionality", projectId: projects[0]._id, createdBy: alice._id, assignedTo: admin._id, type: "task", status: "closed", priority: "medium", isDemo: true },
        { title: "Fix ticket bug", description: "Ensure activity logs work", projectId: projects[0]._id, createdBy: bob._id, assignedTo: admin._id, type: "bug", status: "in-progress", priority: "critical", isDemo: true },
        // Project 2 tickets
        { title: "API setup", description: "Setup Express API", projectId: projects[1]._id, createdBy: admin._id, assignedTo: alice._id, type: "task", status: "open", priority: "high", isDemo: true },
        { title: "Create front-end layout", description: "Basic layout with navbar and footer", projectId: projects[1]._id, createdBy: alice._id, assignedTo: bob._id, type: "feature", status: "closed", priority: "medium", isDemo: true },
        { title: "User authentication", description: "JWT authentication for users", projectId: projects[1]._id, createdBy: admin._id, assignedTo: bob._id, type: "feature", status: "in-progress", priority: "high", isDemo: true },
        { title: "Demo dashboard", description: "Display tickets and project info", projectId: projects[1]._id, createdBy: bob._id, assignedTo: alice._id, type: "task", status: "closed", priority: "medium", isDemo: true },
    ];

    const tickets = await Ticket.insertMany(ticketsData);

    console.log("Creating demo comments...");
    const commentsData = [
        { ticketId: tickets[0]._id, author: admin._id, message: "Let's get started!", isDemo: true },
        { ticketId: tickets[1]._id, author: bob._id, message: "Working on the login page", isDemo: true },
        { ticketId: tickets[1]._id, author: alice._id, message: "Make sure to include demo login button", isDemo: true },
        { ticketId: tickets[2]._id, author: admin._id, message: "Feature added, needs review", isDemo: true },
        { ticketId: tickets[3]._id, author: bob._id, message: "Dashboard layout complete", isDemo: true },
        { ticketId: tickets[4]._id, author: alice._id, message: "Comments are now working", isDemo: true },
        { ticketId: tickets[5]._id, author: bob._id, message: "Bug fix verified", isDemo: true },
        { ticketId: tickets[6]._id, author: admin._id, message: "API setup started", isDemo: true },
        { ticketId: tickets[7]._id, author: alice._id, message: "Frontend layout initial draft", isDemo: true },
        { ticketId: tickets[8]._id, author: bob._id, message: "Authentication implemented", isDemo: true },
        { ticketId: tickets[9]._id, author: alice._id, message: "Dashboard demo ready", isDemo: true },
    ];

    await Comment.insertMany(commentsData);

    console.log("Demo data seeded!");
    process.exit(0);
};

seedDemo().catch(err => {
    console.error(err);
    process.exit(1);
});