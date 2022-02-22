const inquirer = require("inquirer");
// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(profileName, github);

// fs.writeFile("index.html", pageHTML, (err) => {
//   if (err) throw new Error(err);
//   console.log("Portfolio complete! Check out index.html to see the output!");
// });
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("please enter your name");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your github username",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your github username");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "Would you like to add an about section to your portfolio?",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself.",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is the name of your project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the name of your project");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description for the project",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a description for the project");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "jQuery",
          "Es6",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "link",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the link to your github project");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData);
  });
