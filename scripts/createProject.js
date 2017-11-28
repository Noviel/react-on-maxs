const inquirer = require('inquirer');
const ncp = require('ncp');
const path = require('path');

const get = to => path.resolve(__dirname, to);
const appendDirs = to => (...dirs) => path.join(to, ...dirs);
const appendToCWD = appendDirs(process.cwd());

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: `What is your project's name?`,
  },
  {
    type: 'list',
    name: 'projectType',
    message: 'What type of a project you are creating?',
    choices: ['React Application', 'React Components Library'],
    filter(val) {
      return val.toLowerCase();
    },
  },
];

const copy = (from, to, options = {}) =>
  new Promise((resolve, reject) => {
    ncp(from, to, options, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

inquirer.prompt(questions).then(answers => {
  const { projectType, projectName } = answers;

  if (projectType === 'react application') {
    console.log('Preparing React Application');
    copy(get('../templates/core'), appendToCWD(`${projectName}`))
      .then(() => console.log('Done!'))
      .catch(err => console.error(err));
  } else if (projectType === 'react components library') {
    copy(get('../templates/library'), appendToCWD(`${projectName}`))
      .then(() => console.log('Done!'))
      .catch(err => console.error(err));
  }
});
