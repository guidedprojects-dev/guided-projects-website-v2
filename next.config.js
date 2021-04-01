const path = require('path');
const withSass = require('@zeit/next-sass');

const options = {
  sassOptions: {
    // Allow sass compilation for files in the "/styles" directory
    includePaths: [path.join(__dirname, 'styles')],
  },
};

module.exports = options;
