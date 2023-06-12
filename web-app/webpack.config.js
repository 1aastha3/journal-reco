const path = require('path');

module.exports = {
  // other webpack configuration options...

  resolve: {
    fallback: {
      "zlib": false,
      "querystring": false,
      "path": false,
      "crypto": false,
      "fs": false,
      "stream": false,
      "net": false,
      "http": false,
      "querystring": false,
    },
  },
};