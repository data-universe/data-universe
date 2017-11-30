/* eslint "import/no-extraneous-dependencies": false */
/* eslint no-console: false */
const ghpages = require('gh-pages');

const directory = 'dist';

const options = {
  branch: 'master',
  repo: 'https://github.com/data-universe/data-universe.github.io.git',
  message: 'Auto-generated commit from data-universe/data-universe',
};

const callback = err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Published to", options.repo);
  }
};

ghpages.publish(directory, options, callback);
