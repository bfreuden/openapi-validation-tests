const app = require('express')();
const fs = require('fs');
const openapi = require('express-openapi');
const path = require('path');

openapi.initialize({
  apiDoc: fs.readFileSync(path.resolve(__dirname, 'openapi.json'), 'utf8'),
  app: app,
  operations: {
    getPet: function get(req, res) {
      res.status(200).json({
        name: req.params.pet,
        age: 5,
      });
    },
    searchPets: function post(req, res) {
      res.status(200).json({
        hits: [{
          name: "Wolfie",
          age: 5,
        }]
      });
    }
  }
});

module.exports = app;
const port = 8083;
app.listen(port);
console.log(`Ready to serve on http://localhost:${port}`);
console.log("Try:");
console.log(`  curl localhost:${port}/shops/mine/pets/Wolfie`)
console.log(`  curl -XPOST localhost:${port}/shops/mine/pets/_search`)

