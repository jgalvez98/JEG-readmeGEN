// TODO: Include packages needed for this application
const generateMarkdown = require("./utils/generateMarkdown");
const fs = require("fs");
const inquirer = require("inquirer");
/*
WHEN I choose a license for my application from a list of options

THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under

THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
WHEN I click on the links in the Table of Contents

*/

//array of questions for user input
const questions = [
    {
        type: "input",
        message: "What is the project title?",
        name: "title"
    },
    {
        type: "editor",
        message: "what is the project decription ",
        name: "description"
    },
    {
        type: "editor",
        message: "Add installation instructions",
        name: "installation"
    },
    {
        type: "editor",
        message: "usage information",
        name: "usage"
    },
    {
        type: "list",
        message: "Choose the following license:",
        choices: ["MIT", "IBM", "Apache", "No License"],
        name: "license"
    },
    {
        type: "editor",
        message: "contribution guidelines",
        name: "contribution"
    },
    {
        type: "editor",
        message: "test instructions",
        name: "test"
    },
    {
        type: "input",
        message: "What is your github username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    }

];

//function to write README file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, generateMarkdown(data), err => {
        if (err) {
            throw err
        }
        console.log("success!");
    });

}

// function to generate license badge
function renderLicenseBadge(license) {
    if (license === "MIT") {
        return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    }
    else if (license === "IBM") {
        return `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`
    }
    else if (license === "Apache") {
        return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    }
    else if (license === "No License") {
        return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
    }
}

// function to initialize app
function init() {
    inquirer.prompt(questions).then((data) => {
        writeToFile("./output/README.md", data);
    });

}

// Function call to initialize app
init();
