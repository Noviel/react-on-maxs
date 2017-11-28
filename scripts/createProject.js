const path = require('path');
const inquirer = require('inquirer');
const ncp = require('ncp');
const replace = require('replace-in-file');

const appDir = to => path.resolve(__dirname, to);
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

const finalMessage = ({
  projectName,
}) => `You are almost here! Type the following:

 cd ${projectName} 
 yarn install

 To start development:

 yarn dev

 To build for production:

 yarn build:production`;

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

  const templateName = projectType === 'react application' ? 'core' : 'library';
  const templateRoot = appDir(`../templates/${templateName}`);

  const replacer = () => replacePlaceholders({ ...answers, projectRoot });

  const message = finalMessage({ projectName });

  copy(templateRoot, projectRoot)
    .then(replacer)
    .then(console.log(message))
    .catch(err => console.error(err));
});
