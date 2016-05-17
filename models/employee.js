// Employee Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeSchema = new Schema({
    name          : String,
    lastName      : String,
    email         : String,
    password      : String,
	created       : Date
});

// ### Hooks
// #### Pre-Save
employeeSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
employeeSchema.method("instanceMethod", function(param, cb) {
    var employee = this;
    this.save(cb);
});

// ### Static:
employeeSchema.statics.customMethod = function (paramid, cb) {
  var Employee = this;
  Employee.findOne({ _id: paramid}, function(err, employee){
      cb(err, employee);
  });
}

// Export module
module.exports = mongoose.model('Employee', employeeSchema);
