const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require('inquirer')
const path = require('path')
const fs = require("fs");
// const teamMembers = [];
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

function runInquirer() {
    const promptArray = [{
        type: "input",
        message: "What is your name?",
        name: "name"
    }, {
        type: "input",
        message: "What is your ID?",
        name: "id"
    }, {
        type: "input",
        message: "What is your email?",
        name: "email"
    }, {
        type: "list",
        message: "What is your title",
        choices: ["Manager", "Engineer", "Intern"],
        name: "title"
    }];

    return inquirer
        .prompt(promptArray);
}

function runInquirerManager() {
    const promptArray = [{
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }];

    return inquirer
        .prompt(promptArray)
        // .then(answers => {
        //   const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        //   teamMembers.push(manager)
        //   runInquirer();
        // }); 
}

function runInquirerEngineer() {
  const promptArray = [{
    type: "input",
    message: "What is your github?",
    name: "github"
  }];

  return inquirer
    .prompt(promptArray)
    // .then(answers => {
    //   const engineer = new Engineer(answers.name, answers.id, answers.email, answers.officeNumber);
    //   teamMembers.push(engineer);
    //   runInquirer();
    // });
}

function runInquirerIntern() {
    const promptArray = [{
        type: "input",
        message: "What school do you attend?",
        name: "school"
    }];

    return inquirer
        .prompt(promptArray)
        // .then(answers => {
        //   const intern = new Intern(answers.name, answers.id, answers.email, answers.officeNumber);
        //   teamMembers.push(intern);
        //   runInquirer();
        // });
}



async function run() {
    let employeeArray = [];
    let cardInfo =[{}];
    let html;
    const maxTimes = 4;
    for (i = 0; i < maxTimes; i++) {
        const promise = new Promise((resolve, reject) => {
            runInquirer()
                .then(function({ name, id, email, title }) {

                    if (title === "Manager") {
                        runInquirerManager().then(function(officeNumber) {
                            this.employee = new Manager(name, id, email, officeNumber);
                            console.log(officeNumber);
                            employeeArray.push(employee);
                            resolve("done");
                        });

                    
                      } else if (title === "Engineer") {
                        runInquirerEngineer().then(function({ github }) {
                            this.employee = new Engineer(name, id, email, github);
                            console.log(github);
                            employeeArray.push(employee);
                            resolve("done");
                        });
                  
                    } else if (title === "Intern") {
                        runInquirerIntern().then(function({ school }) {
                            this.employee = new Intern(name, id, email, school);
                            console.log(school);
                            employeeArray.push(employee);
                            resolve("done");
                        });
                    }

                }).catch(function(err) {
                    console.log("There was an error.");
                    console.log(err);
                });
        });

        const result = await promise;
        console.log(result);
    }

    // console.log(employeeArray.length);

    for (let i in employeeArray) {
        employee = employeeArray[i];
        cardInfo = {
            name: employee.getName(),
            role: employee.getRole(),
            id: employee.getId(),
            email: employee.getEmail()
        }

        if (employee.getRole() == "Engineer") {
            cardInfo.github = employee.getGithub();
        } else if (employee.getRole() == "Manager") {
            cardInfo.officeNumber = employee.getOfficeNumber();
        } else if (employee.getRole() == "Intern") {
            cardInfo.school = employee.getSchool();
        }

        // html += getCardHtml(cardInfo);
    }
    // console.log(html);
    if(!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employeeArray), 'utf-8');
}
run()
