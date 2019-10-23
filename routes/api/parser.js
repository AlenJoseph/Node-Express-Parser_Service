const express = require('express');
const router = express.Router();
const workingDirPath = '/home/alen/Desktop/workdir';
const simpleGit = require('simple-git')(workingDirPath);
const fs = require('fs');
//Load User model

const Parser = require('../../model/Parser');

const Component = require('../../model/Component');

// @route   POST api/parser/parser
// @desc     To parse the api
// @acess   Public
router.post('/parser', (req, res) => {
  const data = req.body;
  const keyArray = Object.keys(data);
  for (let i in keyArray) {
    console.log(keyArray[i]);
    const values = data[keyArray[i]];

    for (let j in values) {
      console.log('***********************8');
      console.log(Object.keys(values[j])[0]);
      console.log(values[j][Object.keys(values[j])[0]]);
    }
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
module.exports = router;
