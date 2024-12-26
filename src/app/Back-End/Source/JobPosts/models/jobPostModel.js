const mongoose = require('mongoose');

const activeJobPostSchema = new mongoose.Schema({

  jobId: { type: Number, required: true, unique: true },
  jobRoleTitle:  { type: String, required: true },
  jobType:  { type: String, required: true },
  jobLevel:  { type: String, required: true },

  category:  { type: String, required: true },
  skills:  { type: String, required: true },
  proficiency:  { type: String, required: true },
  language:  { type: String, required: true },

  salary:  { type: String, required: true },
  experience: { type:  Number, required: true },
  location:  { type: String, required: true },
  vacancy: { type: Number, required: true },

  benefits:  { type: String, required: true },

  postedOn: { type: Date, default: Date.now }, 
  applyByDate: { type: Date, required: true },

  jobDescription: { type: String, required: true },
  status: { type: String, default: 'active' },

});


const appliedJobPostSchema = new mongoose.Schema({
  jobId: { type: Number, required: true, unique: true },
  jobRoleTitle:  { type: String, required: true },
  jobType:  { type: String, required: true },
  jobLevel:  { type: String, required: true },

  category:  { type: String, required: true },
  skills:  { type: String, required: true },
  proficiency:  { type: String, required: true },
  language:  { type: String, required: true },

  salary:  { type: String, required: true },
  experience: { type:  Number, required: true },
  location:  { type: String, required: true },
  vacancy: { type: Number, required: true },

  benefits:  { type: String, required: true },

  postedOn: { type: Date, default: Date.now }, 
  applyByDate: { type: Date, required: true },

  jobDescription: { type: String, required: true },

  status: { type: String, default: 'applied' },
});


const closedJobPostSchema = new mongoose.Schema({
  jobId: { type: Number, required: true, unique: true },
  jobRoleTitle:  { type: String, required: true },
  jobType:  { type: String, required: true },
  jobLevel:  { type: String, required: true },

  category:  { type: String, required: true },
  skills:  { type: String, required: true },
  proficiency:  { type: String, required: true },
  language:  { type: String, required: true },

  salary:  { type: String, required: true },
  experience: { type:  Number, required: true },
  location:  { type: String, required: true },
  vacancy: { type: Number, required: true },

  benefits:  { type: String, required: true },

  postedOn: { type: Date, default: Date.now }, 
  applyByDate: { type: Date, required: true },

  jobDescription: { type: String, required: true },
  status: { type: String, default: 'closed' },
});

const savedJobPostSchema = new mongoose.Schema({
  jobId: { type: Number, required: true, unique: true },
  jobRoleTitle:  { type: String, required: true },
  jobType:  { type: String, required: true },
  jobLevel:  { type: String, required: true },

  category:  { type: String, required: true },
  skills:  { type: String, required: true },
  proficiency:  { type: String, required: true },
  language:  { type: String, required: true },

  salary:  { type: String, required: true },
  experience: { type:  Number, required: true },
  location:  { type: String, required: true },
  vacancy: { type: Number, required: true },

  benefits:  { type: String, required: true },

  postedOn: { type: Date, default: Date.now }, 
  applyByDate: { type: Date, required: true },

  jobDescription: { type: String, required: true },
  status: { type: String, default: 'saved' },
});

// Export each schema as a separate model
const ActiveJobPost = mongoose.model('Active-JobPost', activeJobPostSchema);
const AppliedJobPost = mongoose.model('Applied-JobPost', appliedJobPostSchema);
const ClosedJobPost = mongoose.model('Closed-JobPost', closedJobPostSchema);
const SavedJobPost = mongoose.model('Saved-JobPost', savedJobPostSchema);


module.exports = { ActiveJobPost, AppliedJobPost, ClosedJobPost, SavedJobPost };
