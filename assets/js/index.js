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

// Check to make sure email address is a valid structure
const validateEmail = function (email) {
    // Use (regular expression) regex to check if email is in a valid format
    const emailExists = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    // If email is valid, return true. Otherwise, log an error message and return false
    if (emailExists) {
        return true;
    } else {
        console.log("\nPlease enter a valid email");
        return false;
    }
};

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
            validate: validateEmail,
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

// Function to prompt user for engineer information
const addEngineer = async () => {
    // Prompt to go here
}

// Function to prompt user for intern information
const addIntern = async () => {
    // Prompt to go here
}

const addTeamMember = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            message: "What type of team member would you like to add?",
            name: "memberType",
            choices: ["Engineer", "Intern"],
        },
    ]);
    switch (answers.memberType) {
        case "Engineer":
            await addEngineer();
            break;
        case "Intern":
            await addIntern();
            break;
        default:
            break;
    }
};

// Define an init function to start the application
const init = async () => {
    // Call the addManager function to add the first manager
    await addManager();
    // Loop to add more team members until the user chooses to stop
    let addMore = true;
    while (addMore) {
        // Prompt the user to confirm if they want to add another team member
        const answers = await inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to add another team member?",
                name: "addMore",
            }
        ]);

        // Update the addMore variable based on user's response
        addMore = answers.addMore;

        // If the user wants to add another team member, call the addTeamMember function
        if (addMore) {
            await addTeamMember();
        }
    }
};

// Call the init function to start the application
init();