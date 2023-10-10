// Importing required modules
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generatereadme");
const writeFileAsync = util.promisify(fs.writeFile);

// Function to prompt the user with questions
async function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "projectTitle",
            message: "Enter the project title:",
        },
        {
            type: "input",
            name: "description",
            message: "Provide a brief project description:",
        },
        {
            type: "input",
            name: "installation",
            message: "Explain the installation process (if any):",
        },
        {
            type: "input",
            name: "usage",
            message: "Describe the usage of this project:",
        },
        {
            type: "list",
            name: "license",
            message: "Choose a license for your project:",
            choices: [
                "Apache License 2.0",
                "MIT License",
                "GNU General Public License v3.0",
                "ISC License",
                "Mozilla Public License 2.0",
                "The Unlicense",
            ],
        },
        {
            type: "input",
            name: "contributing",
            message: "List the contributors to this project:",
        },
        {
            type: "input",
            name: "tests",
            message: "Include any testing instructions:",
        },
        {
            type: "input",
            name: "questions",
            message: "What to do in case of issues or questions:",
        },
        {
            type: "input",
            name: "githubUsername",
            message: "Enter your GitHub username:",
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address:",
        },
    ]);
}

// Initialize the application
async function init() {
    try {
        // Prompt the user and generate responses
        const userResponses = await promptUser();
        const generatedMarkdown = generateMarkdown(userResponses);

        // Write the generated README to a file
        await writeFileAsync("README.md", generatedMarkdown);
        console.log("✅  README.md successfully generated!");
    } catch (error) {
        console.error("❌  Error generating README.md:", error);
    }
}

// Start the application
init();