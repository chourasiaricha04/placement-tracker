const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Applied",
  },

  appliedDate: {
    type: Date,
    default: Date.now,
  },

  deadline: {
  type: Date,
},

notes: {
  type: String,
  default: "",
},
  

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }

});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;