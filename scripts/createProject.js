const path = require('path');
const { platform } = require('os');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const ncp = require('ncp');
const replace = require('replace-in-file');

const appDir = to => path.resolve(__dirname, to);
const appendDirs = to => (...dirs) => path.join(to, ...dirs);
const appendToCWD = appendDirs(process.cwd());

const log = message => () => console.log(message);

const execute = (cmd, options) => () =>
  new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        console.log(`stderr: ${stderr}`);
        console.error(`exec error: ${error}`);
        reject(error);
      } else {
        console.log(`${stdout}`);
        resolve();
      }
    });
  });

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: `What is your project's name?`,
    validate(value) {
      if (value.length) {
        return true;
      }
      return `Please enter correct project's name`;
    },
  },
  {
    type: 'list',
    name: 'projectType',
    message: 'Select the type of your project',
    choices: ['React Application', 'React Library'],
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

const preInstallMessage = `Installing dependencies... Don't worry, it may take a minute or two.\n`;

const createPostInstallMessage = ({
  projectName,
}) => `You are almost here! Now you can go to ${projectName} directory and execute some commands:

 To start development: 
  yarn dev

 To build for production: 
  yarn build:production
  
 Good Luck!`;

const replacePlaceholders = ({ projectRoot, projectType, projectName }) => {
  const manifestFile = appDir(
    `../replaces/${projectType === 'react library' ? 'library' : 'application'}`
  );
  const replacesData = require(manifestFile);
  if (replacesData['package.json']['PROJECT_NAME'] === undefined) {
    replacesData['package.json']['PROJECT_NAME'] = projectName;
  }

  return Promise.all(
    Object.keys(replacesData).map(k =>
      replace({
        disableGlobs: true,
        files: path.resolve(projectRoot, k),
        from: Object.keys(replacesData[k]),
        to: Object.values(replacesData[k]),
      })
    )
  );
};

inquirer.prompt(questions).then(answers => {
  const { projectType, projectName } = answers;
  const projectRoot = appendToCWD(`${projectName}`);
  const appRoot = appDir('../');

  const templateName = projectType.split(' ')[1];
  const templateRoot = appDir(`../templates/${templateName}`);
  const commonTemplateRoot = appDir(`../templates/common`);

  const replacer = () => replacePlaceholders({ ...answers, projectRoot });

  const postInstallMessage = createPostInstallMessage({ projectName });

  const changeDiskCommand =
    platform() === 'win32' && projectRoot[0] !== appRoot[0]
      ? `${projectRoot[0]}: &&`
      : '';

  copy(commonTemplateRoot, projectRoot)
    .then(() => copy(templateRoot, projectRoot))
    .then(replacer)
    .then(log(preInstallMessage))
    .then(
      execute(
        `${changeDiskCommand} cd ${projectRoot} && yarn install && yarn add webpack-features@^3.2.0`
      )
    )
    .then(log(postInstallMessage))
    .catch(err => console.error(err));
});
