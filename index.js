const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;

if(!module.parent) {
  server.listen(PORT, () => {
    console.log(` Server listening on port ${PORT} `);
  });
  

}


module.exports = server;
