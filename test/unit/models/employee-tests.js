// Employee Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Employee, employee;

// Unit Tests
describe('Model Test Employee', function(){
    before(function(){
        // Before all tests
        Employee = require("../../../models/employee.js");
    });

    describe('Employee', function(){
        // It show create a new document in the database
        it('add a employee', function(done){
            employee = new Employee({ name: 'employee'+Math.floor((Math.random() * 10) + 1)});
            employee.save(done);
        });

    });
});
