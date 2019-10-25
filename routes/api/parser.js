const express = require('express');
const router = express.Router();
const workingDirPath = '/home/alen/Desktop/workdir/';
const simpleGit = require('simple-git')(workingDirPath);
const fs = require('fs');
var nrc = require('node-run-cmd');
//Load User model

const Parser = require('../../model/Parser');

const Component = require('../../model/Component');

// @route   POST api/parser/parser
// @desc     To parse the api
// @acess   Public
router.post('/parser', (req, res) => {
  const projectName = 'DemoApp';
  try {
    let dir = workingDirPath + projectName;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.error(err);
  }

  const data = req.body;
  const keyArray = Object.keys(data);
  setTimeout(() => {
    for (let i in keyArray) {
      console.log(keyArray[i]);

      if (keyArray[i] === 'FRONTEND') {
        let values = data[keyArray[i]];
        for (let j in values) {
          getGiturl(Object.keys(values[j])[0]).then(response => {
            console.log(response.git_url);
            if (response.git_url != null) {
              let localUrl = workingDirPath + projectName + '/' + keyArray[i];
              clone('https://' + response.git_url, localUrl);
            }
          });
        }
      } else if (keyArray[i] === 'SERVERS') {
        let values = data[keyArray[i]];
        for (let j in values) {
          getGiturl(Object.keys(values[j])[0]).then(response => {
            console.log(response.git_url);
            if (response.git_url != null) {
              let localUrl = workingDirPath + projectName + '/' + keyArray[i];
              clone('https://' + response.git_url, localUrl);
            }
          });
        }
      } else if (keyArray[i] === 'DATASTORE') {
        let values = data[keyArray[i]];
        for (let j in values) {
          getGiturl(Object.keys(values[j])[0]).then(response => {
            console.log(response.git_url);
            if (response.git_url != null) {
              let localUrl = workingDirPath + projectName + '/' + keyArray[i];
              clone('https://' + response.git_url, localUrl);
            }
          });
        }
      } else if (keyArray[i] === 'MISCELLANEOUS') {
        let values = data[keyArray[i]];
        for (let j in values) {
          getGiturl(Object.keys(values[j])[0]).then(response => {
            console.log(response.git_url);
            if (response.git_url != null) {
              let localUrl = workingDirPath + projectName + '/' + keyArray[i];
              clone('https://' + response.git_url, localUrl);
            }
          });
        }
      } else {
        console.log('Invalid entry');
      }
    }
  }, 2000);

  async function getGiturl(component_name) {
    const response = await Component.findOne({
      component_name: component_name
    });
    if (response != null) {
      return response;
    } else {
      return 0;
    }
  }
  function clone(remote, local) {
    simpleGit.clone(remote, local).then(() => {
      let gitpath = local + '/.git';
      deleteFolderRecursive(gitpath);
      function deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
              // recurse
              deleteFolderRecursive(curPath);
            } else {
              // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      }
    });
  }
});
router.post('/test', (req, res) => {
  simpleGit
    .clone(
      'https://github.com/IDe-code-template/Node_Express_Mongo_Template.git',
      '/home/alen/Desktop/workdir/node'
    )
    .then(result => {
      const path = '/home/alen/Desktop/workdir/node/.git';
      deleteFolderRecursive(path);
      function deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
          fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
              // recurse
              deleteFolderRecursive(curPath);
            } else {
              // delete file
              fs.unlinkSync(curPath);
            }
          });
          fs.rmdirSync(path);
        }
      }
    });
});

router.post('/demo', (req, res) => {
  const USER = 'AlenJoseph';
  const PASS = 'Iamnotcarzy123';
  const REPO = 'github.com/AlenJoseph/NodeTutotial.git';

  const git = require('simple-git/promise');
  const remote = `https://${USER}:${PASS}@${REPO}`;
  nrc.run([
    'git init',
    'git add . ',
    'git commit -m "updated"',
    `git remote add origin ${remote}`,
    'git push'
  ]);
  // git()
  //   .silent(true)
  //   .clone(remote, '/home/alen/Desktop/workdir/node')
  //   .then(() => console.log('finished'))
  //   .catch(err => console.error('failed: ', err));

  require('simple-git')()
    .init()
    .add('./*')
    .commit('first commit!')
    .addRemote('origin', remote)
    .push('origin', 'master');
});

router.post('/addcomponent', (req, res) => {
  // const component_name = req.body.component_name;
  // const git_url = req.body.git_url;

  const newComponent = new Component(req.body);
  newComponent
    .save()
    .then(component => {
      res.status(200).json(component);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
