// Employees REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Employee, employee, agent, employeeId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Employee '+d+"/api/v1/employees", function(){
    before(function(done){
        // Before all tests
        Employee = require("../../../models/employee.js");
        // It show create a new document in the database
        employee = new Employee({ name: 'employee'+Math.floor((Math.random() * 10) + 1)});
        employee.save(function(err, doc){
            employeeId = doc._id;    
        });
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
        agent
          .post(d+'/admin')
          .send({ email: "admin@admin.com", password: "123456" })
          .end(function(res) {
              assert.ok(res.ok);
              done();
          });
    });

    describe('Employees REST', function(){
        it('GET /api/v1/employees', function(done){
            agent
              .get(d+'/api/v1/employees')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/employees/count', function(done){
            agent
              .get(d+'/api/v1/employees/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/employees', function(done){
            agent
              .post(d+'/api/v1/employees')
              .send({ name: 'Test Creation Employee' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Employee');
                  done();
              });
        });
        it('PUT /api/v1/employees/:employeeId', function(done){
            agent
              .put(d+'/api/v1/employees/'+employeeId)
              .send({ name: 'Test Change Employee' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Employee');
                  done();
              });
        });
        it('DELETE /api/v1/employees/:employeeId', function(done){
            agent
              .del(d+'/api/v1/employees/'+employeeId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/employees', function(done){
            agent
              .del(d+'/api/v1/employees/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
