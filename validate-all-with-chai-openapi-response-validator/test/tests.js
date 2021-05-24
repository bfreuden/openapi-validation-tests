const chai = require('chai');
const { expect } = chai;
const chaiResponseValidator = require('chai-openapi-response-validator');
const axios = require('axios');
const fs = require('fs');

describe('Test all servers', function () {

  const pythonPort = 8081;
  const pythonApi = axios.create({baseURL: `http://localhost:${pythonPort}`});

  const javaVertxPort = 8082;
  const javaVertxApi = axios.create({baseURL: `http://localhost:${javaVertxPort}`});

  const nodejsPort = 8083;
  const nodejsApi = axios.create({baseURL: `http://localhost:${nodejsPort}`});

  const javaMicronautPort = 8084;
  const javaMicronautApi = axios.create({baseURL: `http://localhost:${javaMicronautPort}`});

  const debug = false;


  it('Python fastapi server must satisfy basic manual API spec tests', async function () {
    const response = await pythonApi.get("/shops/mine/pets/Wolfie");
    if (debug) {
      console.log("NodeJS server test");
      console.log("GET /shops/mine/pets/Wolfie");
      console.log(response.data);  
    }
    // get pet data has a 'name' field
    expect(response.data.name).to.exist;
    const response2 = await pythonApi.post("/shops/mine/pets/_search");
    if (debug) {
      console.log("POST /shops/mine/pets/_search");
      console.log(response2.data);
    }
    // search pets response has a 'hits' field
    expect(response2.data.hits).to.exist;
  });

  it('Python fastapi server must satisfy API spec', async function () {
    const spec = await pythonApi.get("/openapi.json");
    const specFile = `${__dirname}/python-openapi.json`;
    fs.writeFileSync(specFile, spec.data)
    chai.use(chaiResponseValidator(specFile));
    // get pet data has a 'name' field
    const response = await pythonApi.get("/shops/mine/pets/Wolfie")
    expect(response).to.satisfyApiSpec

    const response2 = await pythonApi.post("/shops/mine/pets/_search")
    expect(response2).to.satisfyApiSpec
  });


  it('Java Vertx Web API Contract server must satisfy basic manual API spec tests', async function () {
    const response = await javaVertxApi.get("/shops/mine/pets/Wolfie");
    if (debug) {
      console.log("Java Vert.x server test");
      console.log("GET /shops/mine/pets/Wolfie");
      console.log(response.data);  
    }
    // get pet data has a 'name' field
    expect(response.data.name).to.exist;
    const response2 = await javaVertxApi.post("/shops/mine/pets/_search");
    if (debug) {
      console.log("POST /shops/mine/pets/_search");
      console.log(response2.data);
    }
    // search pets response has a 'hits' field
    expect(response2.data.hits).to.exist;
  });

  it('Java Vertx Web API Contract server must satisfy API spec', async function () {
    chai.use(chaiResponseValidator(`${__dirname}/../../java-vertx-web-api-contract/src/main/openapi/openapi.json`));

    const response = await javaVertxApi.get("/shops/mine/pets/Wolfie");
    expect(response).to.satisfyApiSpec;

    const response2 = await javaVertxApi.post("/shops/mine/pets/_search");
    expect(response2).to.satisfyApiSpec;
  });


  it('Java Micronaut server must satisfy basic manual API spec tests', async function () {
    const response = await javaMicronautApi.get("/shops/mine/pets/Wolfie");
    if (debug) {
      console.log("Java Micronaut test");
      console.log("GET /shops/mine/pets/Wolfie");
      console.log(response.data);  
    }
    // get pet data has a 'name' field
    expect(response.data.name).to.exist;
    const response2 = await javaMicronautApi.post("/shops/mine/pets/_search", {});
    if (debug) {
      console.log("POST /shops/mine/pets/_search");
      console.log(response2.data);
    }
    // search pets response has a 'hits' field
    expect(response2.data.hits).to.exist;
  });

  it('Java Micronaut server must satisfy API spec', async function () {
    chai.use(chaiResponseValidator(`${__dirname}/../../java-vertx-web-api-contract/src/main/openapi/openapi.json`));

    const response = await javaMicronautApi.get("/shops/mine/pets/Wolfie");
    expect(response).to.satisfyApiSpec;

    const response2 = await javaMicronautApi.post("/shops/mine/pets/_search", {});
    expect(response2).to.satisfyApiSpec;
  });


  it('NodeJS express-openapi server must satisfy basic manual API spec tests', async function () {
    const response = await nodejsApi.get("/shops/mine/pets/Wolfie");
    if (debug) {
      console.log("NodeJS server test");
      console.log("GET /shops/mine/pets/Wolfie");
      console.log(response.data);  
    }
    // get pet data has a 'name' field
    expect(response.data.name).to.exist;
    const response2 = await nodejsApi.post("/shops/mine/pets/_search");
    if (debug) {
      console.log("POST /shops/mine/pets/_search");
      console.log(response2.data);
    }
    // search pets response has a 'hits' field
    expect(response2.data.hits).to.exist;
  });

  it('NodeJS express-openapi server must satisfy API spec', async function () {
    chai.use(chaiResponseValidator(`${__dirname}/../../nodejs-express-openapi/openapi.json`));
    // get pet data has a 'name' field
    const response = await nodejsApi.get("/shops/mine/pets/Wolfie")
    expect(response).to.satisfyApiSpec

    const response2 = await nodejsApi.post("/shops/mine/pets/_search")
    expect(response2).to.satisfyApiSpec
  });

});
