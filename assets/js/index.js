const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// Create an empty array to hold the team members that will be added
const teamMembers = [];

// Define a function to add a manager to the teamMembers array
const addManager = async () => {

    // Prompt the user for information about the manager using Inquirer
    const answers = await inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name",
        }, {
            type: "input",
            message: "What is the manager's Employee ID?",
            name: "id",
        }, {
            type: "input",
            message: "What is the manager's email address?",
            name: "email",
        }, {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
        }
    ]);

    // Create a new Manager object using the provided information
    const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
    );

    // Add the new manager to the teamMembers array
    teamMembers.push(manager);
    // Log a message indicating that the manager has been added
    console.log("Manager added successfully!");
};

// Define an init function to start the application
const init = async () => {
    // Call the addManager function to add the first manager
    await addManager();
};

// Call the init function to start the application
init();