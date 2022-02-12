const fs = require("fs");
const profileDataArgs = process.argv.slice(2);

const [profileName, github] = profileDataArgs;
const generatePage = require("./src/page-template.js");

fs.writeFile("index.html", generatePage(profileName, github), (err) => {
  if (err) throw new Error(err);
  console.log("Portfolio complete! Check out index.html to see the output!");
});
